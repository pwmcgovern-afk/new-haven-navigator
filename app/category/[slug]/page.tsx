import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { CATEGORIES } from '@/lib/constants'
import CategoryClient from './CategoryClient'

export default async function CategoryPage({
  params
}: {
  params: { slug: string }
}) {
  const category = CATEGORIES.find(c => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const resources = await prisma.resource.findMany({
    where: {
      categories: { has: params.slug }
    },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      nameEs: true,
      organization: true,
      description: true,
      descriptionEs: true,
      categories: true,
      address: true,
      phone: true
    }
  })

  return <CategoryClient slug={params.slug} resources={resources} />
}
