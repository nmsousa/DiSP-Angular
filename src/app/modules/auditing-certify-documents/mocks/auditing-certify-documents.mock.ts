// tslint:disable
export const mockAuditingCertifyDocs: any = {
  'links':    [
           {
        'rel': 'first',
        'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc?page=0&size=10&sort=id,asc',
        'hreflang': null,
        'media': null,
        'title': null,
        'type': null,
        'deprecation': null
     },
           {
        'rel': 'self',
        'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc?page=0&size=10&sort=id,asc',
        'hreflang': null,
        'media': null,
        'title': null,
        'type': null,
        'deprecation': null
     },
           {
        'rel': 'next',
        'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc?page=1&size=10&sort=id,asc',
        'hreflang': null,
        'media': null,
        'title': null,
        'type': null,
        'deprecation': null
     },
           {
        'rel': 'last',
        'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc?page=5&size=10&sort=id,asc',
        'hreflang': null,
        'media': null,
        'title': null,
        'type': null,
        'deprecation': null
     }
  ],
  'content':    [
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/466',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 1,
           'id': 466,
           'level': 'SUCCESS',
           'type':             {
              '@jsonTag': 1,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 1,
              'id': 872,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': null,
              'name': 'DISP-Client',
              'token': null
           },
           'originalFileSize': 107964,
           'signedFileSize': 128301,
           'dateOccured': '03/02/2020 16:17:47',
           'hash': '09MY/jwlWHTLKBTdQ1Hw+hUNOHe20m3hsglzhsqamke9Lt/weaT6oRgWhJzpXD8HhPH3yEu6LCm6isrf0tZmHQ==',
           'description': 'CERTIFIED',
           'filename': 'test.pdf'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/467',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 2,
           'id': 467,
           'level': 'SUCCESS',
           'type':             {
              '@jsonTag': 2,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 2,
              'id': 65,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': 'DIT-SILW-TMA@europarl.europa.eu',
              'name': 'PETIGREF',
              'token': null
           },
           'originalFileSize': 107964,
           'signedFileSize': 128301,
           'dateOccured': '03/02/2020 16:18:57',
           'hash': 'dgZcQq4MroK+LFdnMkrDPmgCeyv+kFAZa8noVtB7kpON4r4pcdB7UN8mRUCS4OZLcanrjk3CDRV7yGEB5k/BjQ==',
           'description': 'CERTIFIED',
           'filename': 'test.pdf'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/468',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 3,
           'id': 468,
           'level': 'ERROR',
           'type':             {
              '@jsonTag': 3,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 3,
              'id': 65,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': 'DIT-SILW-TMA@europarl.europa.eu',
              'name': 'PETIGREF',
              'token': null
           },
           'originalFileSize': 107964,
           'signedFileSize': 0,
           'dateOccured': '03/02/2020 16:33:22',
           'hash': null,
           'description': 'File name mustn\'t have an extension!',
           'filename': 'test.doc'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/469',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 4,
           'id': 469,
           'level': 'ERROR',
           'type':             {
              '@jsonTag': 4,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 4,
              'id': 872,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': null,
              'name': 'DISP-Client',
              'token': null
           },
           'originalFileSize': 128318,
           'signedFileSize': 0,
           'dateOccured': '03/02/2020 17:00:37',
           'hash': null,
           'description': 'Document mustn\'t have previous signature(s)!',
           'filename': 'Test_certify_Doc'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/470',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 5,
           'id': 470,
           'level': 'ERROR',
           'type':             {
              '@jsonTag': 5,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 5,
              'id': 872,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': null,
              'name': 'DISP-Client',
              'token': null
           },
           'originalFileSize': 128318,
           'signedFileSize': 0,
           'dateOccured': '03/02/2020 17:00:37',
           'hash': null,
           'description': 'Document mustn\'t have previous signature(s)!',
           'filename': 'Test_certify_Doc.pdf'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/471',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 6,
           'id': 471,
           'level': 'ERROR',
           'type':             {
              '@jsonTag': 6,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 6,
              'id': 65,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': 'DIT-SILW-TMA@europarl.europa.eu',
              'name': 'PETIGREF',
              'token': null
           },
           'originalFileSize': 107964,
           'signedFileSize': 0,
           'dateOccured': '03/02/2020 17:01:14',
           'hash': null,
           'description': 'File name mustn\'t have an extension!',
           'filename': 'test.doc'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/472',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 7,
           'id': 472,
           'level': 'ERROR',
           'type':             {
              '@jsonTag': 7,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 7,
              'id': 872,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': null,
              'name': 'DISP-Client',
              'token': null
           },
           'originalFileSize': 37096,
           'signedFileSize': 0,
           'dateOccured': '03/02/2020 17:09:10',
           'hash': null,
           'description': 'Document needs to be a valid PDF file!',
           'filename': 'Demande d\'occupation saison 19-20 FR.docx'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/473',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 8,
           'id': 473,
           'level': 'SUCCESS',
           'type':             {
              '@jsonTag': 8,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 8,
              'id': 872,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': null,
              'name': 'DISP-Client',
              'token': null
           },
           'originalFileSize': 107964,
           'signedFileSize': 128318,
           'dateOccured': '03/02/2020 17:12:09',
           'hash': 'TbWuI3rx9mOj7tMEDfJkfDlzcIXCcJAzk8vUWkDER6Mw72Y/781/L2ihepILIlbMhCXiGf/eoz07zd1YrWFP9g==',
           'description': 'CERTIFIED',
           'filename': 'samplePDF_adlib_test.pdf'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/474',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 9,
           'id': 474,
           'level': 'ERROR',
           'type':             {
              '@jsonTag': 9,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 9,
              'id': 872,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': null,
              'name': 'DISP-Client',
              'token': null
           },
           'originalFileSize': 128318,
           'signedFileSize': 0,
           'dateOccured': '04/02/2020 08:50:04',
           'hash': null,
           'description': 'Document mustn\'t have previous signature(s)!',
           'filename': 'filename'
        }
     },
           {
        'links': [         {
           'rel': 'self',
           'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/auditingCertifyDoc/475',
           'hreflang': null,
           'media': null,
           'title': null,
           'type': null,
           'deprecation': null
        }],
        'content':          {
           '@jsonTag': 10,
           'id': 475,
           'level': 'ERROR',
           'type':             {
              '@jsonTag': 10,
              'id': 40,
              'key': 'event.certify.document',
              'emailTemplate': null
           },
           'externalApplication':             {
              '@jsonTag': 10,
              'id': 872,
              'isActive': false,
              'callbackPut': null,
              'callbackUpload': null,
              'creationDate': null,
              'email': null,
              'name': 'DISP-Client',
              'token': null
           },
           'originalFileSize': 128318,
           'signedFileSize': 0,
           'dateOccured': '04/02/2020 08:50:16',
           'hash': null,
           'description': 'The alias or passphrase is not correct!',
           'filename': 'filename'
        }
     }
  ],
  'page':    {
     'size': 10,
     'totalElements': 54,
     'totalPages': 6,
     'number': 0
  }
};
