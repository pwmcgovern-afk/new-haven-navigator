import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const resource = await prisma.resource.findUnique({ where: { id: params.id } })
    if (!resource) {
      return Response.json({ error: 'Not found' }, { status: 404 })
    }
    return Response.json(resource)
  } catch (error) {
    console.error('Admin resource GET error:', error)
    return Response.json({ error: 'Failed to fetch resource' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    const body = await req.json()

    const resource = await prisma.resource.update({
      where: { id: params.id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.organization !== undefined && { organization: body.organization || null }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.categories !== undefined && { categories: body.categories }),
        ...(body.address !== undefined && { address: body.address || null }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.state !== undefined && { state: body.state }),
        ...(body.zip !== undefined && { zip: body.zip || null }),
        ...(body.phone !== undefined && { phone: body.phone || null }),
        ...(body.website !== undefined && { website: body.website || null }),
        ...(body.email !== undefined && { email: body.email || null }),
        ...(body.hours !== undefined && { hours: body.hours || null }),
        ...(body.eligibility !== undefined && { eligibility: body.eligibility }),
        ...(body.howToApply !== undefined && { howToApply: body.howToApply || null }),
        ...(body.tips !== undefined && { tips: body.tips }),
        ...(body.nameEs !== undefined && { nameEs: body.nameEs || null }),
        ...(body.descriptionEs !== undefined && { descriptionEs: body.descriptionEs || null }),
        ...(body.howToApplyEs !== undefined && { howToApplyEs: body.howToApplyEs || null }),
        ...(body.tipsEs !== undefined && { tipsEs: body.tipsEs }),
        ...(body.verifiedAt !== undefined && { verifiedAt: body.verifiedAt ? new Date(body.verifiedAt) : null }),
      }
    })

    return Response.json({ success: true, resource })
  } catch (error) {
    console.error('Admin resource PUT error:', error)
    return Response.json({ error: 'Failed to update resource' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const authError = requireAdmin(req)
  if (authError) return authError

  try {
    // Delete associated feedback first
    await prisma.feedback.deleteMany({ where: { resourceId: params.id } })
    await prisma.resource.delete({ where: { id: params.id } })

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Admin resource DELETE error:', error)
    return Response.json({ error: 'Failed to delete resource' }, { status: 500 })
  }
}
