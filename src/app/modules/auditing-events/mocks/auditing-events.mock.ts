// tslint:disable
export const mockAuditingEvents: any = {
  'links': [{
    'rel': 'self',
    'href': 'http://localhost:4200/disp-web-2.9.0/api/v1/admin/auditingEvents?dateOccured=2020/01/01&dateOccured=2020/03/03&requestId=22337&username=nsousa&page=0&size=5&sort=id,asc',
    'hreflang': null,
    'media': null,
    'title': null,
    'type': null,
    'deprecation': null
  }],
  'content': [{
    'links': [{
      'rel': 'self',
      'href': 'http://localhost:4200/disp-web-2.9.0/api/v1/admin/auditingEvents/62427',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 1,
      'id': 62427,
      'occurredDate': '20/01/2020 16:56:50',
      'description': null,
      'level': 'INFO',
      'lotId': null,
      'requestId': 22337,
      'type': {'@jsonTag': 1, 'id': 1, 'key': 'event.request.created', 'emailTemplate': 'email_request_created'},
      'username': 'nsousa',
      'requestTitle': 'Teste 20 janeiro - 3',
      'requestDeadline': '22/01/2020 23:59:59',
      'userGroups': ['Legislative IT Systems Unit', 'Parliament\'s Secretariat', 'European Parliament', 'Directorate for Development and Support', 'Directorate-General for Innovation and Technological Support', 'Parliamentary Systems Service']
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://localhost:4200/disp-web-2.9.0/api/v1/admin/auditingEvents/62433',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 2,
      'id': 62433,
      'occurredDate': '20/01/2020 17:03:10',
      'description': 'the request has been archived successfully',
      'level': 'INFO',
      'lotId': null,
      'requestId': 22337,
      'type': {'@jsonTag': 2, 'id': 26, 'key': 'event.request.archived', 'emailTemplate': 'null'},
      'username': 'nsousa',
      'requestTitle': 'Teste 20 janeiro - 3',
      'requestDeadline': '22/01/2020 23:59:59',
      'userGroups': ['Legislative IT Systems Unit', 'Parliament\'s Secretariat', 'European Parliament', 'Directorate for Development and Support', 'Directorate-General for Innovation and Technological Support', 'Parliamentary Systems Service']
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://localhost:4200/disp-web-2.9.0/api/v1/admin/auditingEvents/62434',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 3,
      'id': 62434,
      'occurredDate': '20/01/2020 17:03:10',
      'description': 'comment example',
      'level': 'INFO',
      'lotId': null,
      'requestId': 22337,
      'type': {'@jsonTag': 3, 'id': 38, 'key': 'event.request.purged', 'emailTemplate': null},
      'username': 'nsousa',
      'requestTitle': 'Teste 20 janeiro - 3',
      'requestDeadline': '22/01/2020 23:59:59',
      'userGroups': ['Legislative IT Systems Unit', 'Parliament\'s Secretariat', 'European Parliament', 'Directorate for Development and Support', 'Directorate-General for Innovation and Technological Support', 'Parliamentary Systems Service']
    }
  }],
  'page': {'size': 5, 'totalElements': 3, 'totalPages': 1, 'number': 0}
};
