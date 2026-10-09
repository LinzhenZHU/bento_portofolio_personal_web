import { defineType, defineField } from 'sanity'

export const projectCategory = defineType({
  name: 'projectCategory',
  title: 'Project Category',
  type: 'document',
  fields: [
    defineField({
      name: 'workTab',
      title: 'Work tab',
      type: 'string',
      description: 'Which top tab this group appears under',
      options: {
        list: [
          { title: 'Publications', value: 'publication' },
          { title: 'Honors & Awards', value: 'honorAward' },
          { title: 'Service', value: 'service' },
        ],
        layout: 'radio',
      },
      initialValue: 'publication',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Name',
      type: 'string',
      description: 'e.g. "Conference Papers", "Journal Articles", "Peer Review"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authors',
              title: 'Authors',
              type: 'string',
              description: 'Use * to indicate equal contribution.',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'image',
              title: 'Screenshot / Thumbnail',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'techStack',
              title: 'Venue, Year, and Status',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'e.g. "ACM MobiCom 2026", "Accepted full paper"',
            }),
            defineField({
              name: 'href',
              title: 'Project URL',
              type: 'url',
              description: 'Link to live project (optional)',
            }),
            defineField({
              name: 'links',
              title: 'Resources',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
                  defineField({ name: 'href', title: 'URL', type: 'url', validation: (rule) => rule.required() }),
                ],
              }],
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'category' },
  },
})
