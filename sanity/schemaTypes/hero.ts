import { defineType, defineField } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'greeting',
      title: 'Greeting',
      type: 'string',
      description: 'Main greeting text (e.g. "Hi, I am Zoe")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titles',
      title: 'Titles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Rotating titles displayed below the greeting',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'links',
      title: 'Academic Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required() }),
          defineField({ name: 'href', title: 'URL', type: 'url', validation: (rule) => rule.required().uri({ allowRelative: true }) }),
        ],
      }],
    }),
  ],
  preview: {
    select: { title: 'greeting' },
  },
})
