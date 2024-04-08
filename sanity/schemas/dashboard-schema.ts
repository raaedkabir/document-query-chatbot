import { defineType } from 'sanity'

export default defineType({
  name: 'dashboard',
  title: 'Dashboard',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'header',
      title: 'Header',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'accountUsageSection',
      title: 'Account Usage Section',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'header',
              title: 'Header',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'queriesCopy',
              title: 'Queries Copy',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'uploadedFilesCopy',
              title: 'Uploaded Files Copy',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'limitCopy',
              title: 'Limit Copy',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'limitCTAMessage',
              title: 'Limit CTA Message',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'limitCTAButtonText',
              title: 'Limit CTA Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'limitAdditionalCopy',
              title: 'Limit CTA Additional Copy',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'uploadFileButtonText',
      title: 'Upload File Button',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'uploadModalTitle',
      title: 'Upload Modal Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'uploadModalContent',
      title: 'Upload Modal Content',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'uploadModalFileTypeRestrictions',
      title: 'Upload Modal File Type Restrictions',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'uploadModalFileSizeRestrictions',
      title: 'Upload Modal File Size Restrictions',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((text: string) => {
          if (typeof text === 'undefined') {
            return true
          }

          const regex = /.*\{.*\}.*/
          if (regex.test(text)) {
            return true
          } else {
            return 'Must include a placeholder for the file size limit in { size } format'
          }
        }),
    },
    {
      name: 'uploadModalLoadingMessages',
      title: 'Upload Modal Loading Messages',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'uploadingFileMessage',
              title: 'Uploading File Message',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'writingToDatabaseMessage',
              title: 'Writing to Database Message',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'redirectingMessage',
              title: 'Redirecting Message',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().max(1),
    },
    {
      name: 'uploadModalErrorMessages',
      title: 'Upload Modal Error Messages',
      type: 'array',
      of: [
        {
          type: 'document',
          fields: [
            {
              name: 'fileUploadQuotaMessage',
              title: 'File Upload Quota Error Message',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'fileSizeMessage',
              title: 'File Size Error Message',
              type: 'string',
              validation: (Rule) =>
                Rule.required().custom((text: string) => {
                  if (typeof text === 'undefined') {
                    return true
                  }

                  const regex = /.*\{.*\}.*/
                  if (regex.test(text)) {
                    return true
                  } else {
                    return 'Must include a placeholder for the file size limit in { size } format'
                  }
                }),
            },
            {
              name: 'fileTypeMessage',
              title: 'File Type Error Message',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'fileHasTooManyPagesMessage',
              title: 'File Has Too Many Pages Error Message',
              type: 'string',
              validation: (Rule) =>
                Rule.required().custom((text: string) => {
                  if (typeof text === 'undefined') {
                    return true
                  }

                  const regex = /.*\{.*\}.*/
                  if (regex.test(text)) {
                    return true
                  } else {
                    return 'Must include a placeholder for the file page limit in { number } format'
                  }
                }),
            },
            {
              name: 'fileNameAlreadyExistsMessage',
              title: 'File Name Already Exists Error Message',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().max(1),
    },
  ],
})
