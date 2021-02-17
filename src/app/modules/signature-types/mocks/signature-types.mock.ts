// tslint:disable
export const mockSignatureTypes: any = {
  'links': [{
    'rel': 'self',
    'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes?page=0&size=2000&sort=id,name,asc',
    'hreflang': null,
    'media': null,
    'title': null,
    'type': null,
    'deprecation': null
  }], 'content': [{
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/1',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 1,
      'id': 1,
      'allowedGroups': [{
        '@jsonTag': 1,
        'id': 1,
        'group': {'@jsonTag': 1, 'id': 1, 'epId': 1, 'shortName': 'EP', 'fullName': 'EP', 'groupType': 'S', 'isActive': true, 'users': null}
      }, {
        '@jsonTag': 2,
        'id': 3,
        'group': {
          '@jsonTag': 2,
          'id': 2,
          'epId': 2,
          'shortName': 'Budget DG',
          'fullName': 'Budget DG',
          'groupType': 'B',
          'isActive': true,
          'users': null
        }
      }, {
        '@jsonTag': 3,
        'id': 7,
        'group': {
          '@jsonTag': 3,
          'id': 1727,
          'epId': 2889,
          'shortName': 'ITEC',
          'fullName': 'Directorate-General for Innovation and Technological Support',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 1,
        'id': 2,
        'signatureMode': {
          '@jsonTag': 1,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }, {
        '@jsonTag': 2,
        'id': 3224,
        'signatureMode': {
          '@jsonTag': 2,
          'id': 250,
          'applet': 0,
          'description': 'prompt.eseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:E-SEAL,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Advanced Electronic Signature',
          'path': null,
          'pinRequest': 1,
          'status': 0,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': true,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 1, 'id': 1, 'name': 'Budget', 'status': 1},
      'name': 'Type A',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 2,
      'status': 1,
      'visible': 1,
      'trustedAuthorities': [{
        '@jsonTag': 1,
        'id': 1,
        'authority': {'@jsonTag': 1, 'id': 1, 'commonName': 'EPSign Officials CA', 'registrationDate': '08/03/2012 16:02:17'}
      }, {'@jsonTag': 2, 'id': 33, 'authority': 1}, {
        '@jsonTag': 3,
        'id': 2,
        'authority': {'@jsonTag': 2, 'id': 2, 'commonName': 'European Parliament', 'registrationDate': '08/03/2012 16:02:17'}
      }],
      'workflowType': 'SEQUENTIAL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/2',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 2,
      'id': 2,
      'allowedGroups': [{
        '@jsonTag': 4,
        'id': 2,
        'group': {
          '@jsonTag': 4,
          'id': 2,
          'epId': 2,
          'shortName': 'Budget DG',
          'fullName': 'Budget DG',
          'groupType': 'B',
          'isActive': true,
          'users': null
        }
      }, {
        '@jsonTag': 5,
        'id': 11,
        'group': {
          '@jsonTag': 5,
          'id': 1727,
          'epId': 2889,
          'shortName': 'ITEC',
          'fullName': 'Directorate-General for Innovation and Technological Support',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 3,
        'id': 3,
        'signatureMode': {
          '@jsonTag': 3,
          'id': 122,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-T,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES-T)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }, {
        '@jsonTag': 4,
        'id': 3277,
        'signatureMode': {
          '@jsonTag': 4,
          'id': 250,
          'applet': 0,
          'description': 'prompt.eseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:E-SEAL,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Advanced Electronic Signature',
          'path': null,
          'pinRequest': 1,
          'status': 0,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': false,
      'icon': null,
      'ipCheck': true,
      'isProtected': false,
      'keyType': {'@jsonTag': 2, 'id': 2, 'name': 'Flexible', 'status': 1},
      'name': 'Type B',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': {
        '@jsonTag': 5,
        'id': 2,
        'applet': 0,
        'description': 'prompt.pincode.description',
        'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
        'fileTypeSupport': 'FILE_PDF',
        'name': 'PinCode (PADES)',
        'path': null,
        'pinRequest': 1,
        'status': 1,
        'type': 'PIN'
      },
      'status': 1,
      'visible': 1,
      'trustedAuthorities': [{
        '@jsonTag': 4,
        'id': 3,
        'authority': {'@jsonTag': 3, 'id': 1, 'commonName': 'EPSign Officials CA', 'registrationDate': '08/03/2012 16:02:17'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/3',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 3,
      'id': 3,
      'allowedGroups': [{
        '@jsonTag': 6,
        'id': 4,
        'group': {
          '@jsonTag': 6,
          'id': 3137,
          'epId': null,
          'shortName': 'MEPs-DiSP',
          'fullName': 'Group comprising of all Members of the European Parliament',
          'groupType': null,
          'isActive': true,
          'users': null
        }
      }, {
        '@jsonTag': 7,
        'id': 10,
        'group': {
          '@jsonTag': 7,
          'id': 1727,
          'epId': 2889,
          'shortName': 'ITEC',
          'fullName': 'Directorate-General for Innovation and Technological Support',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 5,
        'id': 5,
        'signatureMode': {
          '@jsonTag': 6,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }, {
        '@jsonTag': 6,
        'id': 3022,
        'signatureMode': {
          '@jsonTag': 7,
          'id': 22,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES) Clone',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }, {
        '@jsonTag': 7,
        'id': 3122,
        'signatureMode': {
          '@jsonTag': 8,
          'id': 122,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-T,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES-T)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }, {
        '@jsonTag': 8,
        'id': 3222,
        'signatureMode': {
          '@jsonTag': 9,
          'id': 222,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-LT,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES-LT)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }, {
        '@jsonTag': 9,
        'id': 3272,
        'signatureMode': {
          '@jsonTag': 10,
          'id': 250,
          'applet': 0,
          'description': 'prompt.eseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:E-SEAL,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Advanced Electronic Signature',
          'path': null,
          'pinRequest': 1,
          'status': 0,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 3, 'id': 3, 'name': 'Amendments', 'status': 1},
      'name': 'Committee AM',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 6,
      'status': 0,
      'visible': 0,
      'trustedAuthorities': [{
        '@jsonTag': 5,
        'id': 8,
        'authority': {'@jsonTag': 4, 'id': 5, 'commonName': 'EPSign Individuals CA', 'registrationDate': '08/03/2012 00:00:00'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/4',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 4,
      'id': 4,
      'allowedGroups': [{
        '@jsonTag': 8,
        'id': 8,
        'group': {
          '@jsonTag': 8,
          'id': 1727,
          'epId': 2889,
          'shortName': 'ITEC',
          'fullName': 'Directorate-General for Innovation and Technological Support',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 10,
        'id': 7,
        'signatureMode': {
          '@jsonTag': 11,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': true,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 4, 'id': 1, 'name': 'Budget', 'status': 1},
      'name': 'Type C',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 11,
      'status': 0,
      'visible': 1,
      'trustedAuthorities': [{
        '@jsonTag': 6,
        'id': 5,
        'authority': {'@jsonTag': 5, 'id': 4, 'commonName': 'DiSPEP', 'registrationDate': '08/03/2012 00:00:00'}
      }, {
        '@jsonTag': 7,
        'id': 6,
        'authority': {'@jsonTag': 6, 'id': 5, 'commonName': 'EPSign Individuals CA', 'registrationDate': '08/03/2012 00:00:00'}
      }, {
        '@jsonTag': 8,
        'id': 7,
        'authority': {'@jsonTag': 7, 'id': 7, 'commonName': 'DEV EPSIGN OFFICIALS CA', 'registrationDate': '25/01/2013 00:00:00'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/5',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 5,
      'id': 5,
      'allowedGroups': [],
      'allowedModes': [{
        '@jsonTag': 11,
        'id': 9,
        'signatureMode': {
          '@jsonTag': 12,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': true,
      'keyType': {'@jsonTag': 5, 'id': 0, 'name': 'Default', 'status': 1},
      'name': 'POME',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 12,
      'status': 0,
      'visible': 0,
      'trustedAuthorities': [{
        '@jsonTag': 9,
        'id': 10,
        'authority': {'@jsonTag': 8, 'id': 3, 'commonName': 'eurodyn CA', 'registrationDate': '08/03/2012 16:02:17'}
      }, {
        '@jsonTag': 10,
        'id': 9,
        'authority': {'@jsonTag': 9, 'id': 4, 'commonName': 'DiSPEP', 'registrationDate': '08/03/2012 00:00:00'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/6',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 6,
      'id': 6,
      'allowedGroups': [],
      'allowedModes': [],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': true,
      'keyType': {'@jsonTag': 6, 'id': 0, 'name': 'Default', 'status': 1},
      'name': 'TOKEN',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': {
        '@jsonTag': 13,
        'id': 2,
        'applet': 0,
        'description': 'prompt.pincode.description',
        'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
        'fileTypeSupport': 'FILE_PDF',
        'name': 'PinCode (PADES)',
        'path': null,
        'pinRequest': 1,
        'status': 1,
        'type': 'PIN'
      },
      'status': 1,
      'visible': 0,
      'trustedAuthorities': [],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/7',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 7,
      'id': 7,
      'allowedGroups': [{
        '@jsonTag': 9,
        'id': 9,
        'group': {
          '@jsonTag': 9,
          'id': 3323,
          'epId': 4007,
          'shortName': 'EPRS - EXPOL',
          'fullName': 'External Policies Unit',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 12,
        'id': 11,
        'signatureMode': {
          '@jsonTag': 14,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': true,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 7, 'id': 7, 'name': 'Internal', 'status': 1},
      'name': 'WEBVISA',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 14,
      'status': 1,
      'visible': 0,
      'trustedAuthorities': [{
        '@jsonTag': 11,
        'id': 11,
        'authority': {'@jsonTag': 10, 'id': 1, 'commonName': 'EPSign Officials CA', 'registrationDate': '08/03/2012 16:02:17'}
      }, {
        '@jsonTag': 12,
        'id': 12,
        'authority': {'@jsonTag': 11, 'id': 2, 'commonName': 'European Parliament', 'registrationDate': '08/03/2012 16:02:17'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/8',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 8,
      'id': 8,
      'allowedGroups': [],
      'allowedModes': [{
        '@jsonTag': 13,
        'id': 12,
        'signatureMode': {
          '@jsonTag': 15,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_MANDATORY',
      'fileRead': false,
      'icon': null,
      'ipCheck': true,
      'isProtected': true,
      'keyType': {'@jsonTag': 8, 'id': 0, 'name': 'Default', 'status': 1},
      'name': 'POME-S',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 15,
      'status': 1,
      'visible': 0,
      'trustedAuthorities': [],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/9',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 9,
      'id': 9,
      'allowedGroups': [],
      'allowedModes': [],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 9, 'id': 7, 'name': 'Internal', 'status': 1},
      'name': 'INTERNAL ONLY',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': {
        '@jsonTag': 16,
        'id': 2,
        'applet': 0,
        'description': 'prompt.pincode.description',
        'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
        'fileTypeSupport': 'FILE_PDF',
        'name': 'PinCode (PADES)',
        'path': null,
        'pinRequest': 1,
        'status': 1,
        'type': 'PIN'
      },
      'status': 1,
      'visible': 0,
      'trustedAuthorities': [],
      'workflowType': 'SEQUENTIAL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/10',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 10,
      'id': 10,
      'allowedGroups': [],
      'allowedModes': [],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': true,
      'keyType': {'@jsonTag': 10, 'id': 7, 'name': 'Internal', 'status': 1},
      'name': 'INTERNAL AND TOKEN',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': {
        '@jsonTag': 17,
        'id': 2,
        'applet': 0,
        'description': 'prompt.pincode.description',
        'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
        'fileTypeSupport': 'FILE_PDF',
        'name': 'PinCode (PADES)',
        'path': null,
        'pinRequest': 1,
        'status': 1,
        'type': 'PIN'
      },
      'status': 0,
      'visible': 0,
      'trustedAuthorities': [],
      'workflowType': 'SEQUENTIAL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/11',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 11,
      'id': 11,
      'allowedGroups': [],
      'allowedModes': [{
        '@jsonTag': 14,
        'id': 14,
        'signatureMode': {
          '@jsonTag': 18,
          'id': 250,
          'applet': 0,
          'description': 'prompt.eseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:E-SEAL,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Advanced Electronic Signature',
          'path': null,
          'pinRequest': 1,
          'status': 0,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': true,
      'icon': null,
      'ipCheck': true,
      'isProtected': true,
      'keyType': {'@jsonTag': 11, 'id': 0, 'name': 'Default', 'status': 1},
      'name': 'Sequential',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 18,
      'status': 1,
      'visible': 1,
      'trustedAuthorities': [],
      'workflowType': 'SEQUENTIAL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/12',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 12,
      'id': 12,
      'allowedGroups': [],
      'allowedModes': [],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': true,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 12, 'id': 3, 'name': 'Amendments', 'status': 1},
      'name': 'SignatureType_NC_2',
      'notificationHoursBeforeDeadline': 90,
      'recommendedMode': {
        '@jsonTag': 19,
        'id': 2,
        'applet': 0,
        'description': 'prompt.pincode.description',
        'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
        'fileTypeSupport': 'FILE_PDF',
        'name': 'PinCode (PADES)',
        'path': null,
        'pinRequest': 1,
        'status': 1,
        'type': 'PIN'
      },
      'status': 0,
      'visible': 0,
      'trustedAuthorities': [],
      'workflowType': 'SEQUENTIAL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/19',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }],
    'content': {
      '@jsonTag': 13,
      'id': 19,
      'allowedGroups': [{
        '@jsonTag': 10,
        'id': 12,
        'group': {
          '@jsonTag': 10,
          'id': 1727,
          'epId': 2889,
          'shortName': 'ITEC',
          'fullName': 'Directorate-General for Innovation and Technological Support',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 15,
        'id': 13,
        'signatureMode': {
          '@jsonTag': 20,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 13, 'id': 9, 'name': 'CERT. TRUE COPY ON EACH PAGE', 'status': 1},
      'name': 'TRUECOPY',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 20,
      'status': 0,
      'visible': 0,
      'trustedAuthorities': [],
      'workflowType': 'SEQUENTIAL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/20',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 14,
      'id': 20,
      'allowedGroups': [{
        '@jsonTag': 11,
        'id': 13,
        'group': {
          '@jsonTag': 11,
          'id': 1727,
          'epId': 2889,
          'shortName': 'ITEC',
          'fullName': 'Directorate-General for Innovation and Technological Support',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 16,
        'id': 15,
        'signatureMode': {
          '@jsonTag': 21,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 14, 'id': 10, 'name': 'QP PLUS', 'status': 1},
      'name': 'QPPLUS',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 21,
      'status': 0,
      'visible': 0,
      'trustedAuthorities': [{
        '@jsonTag': 13,
        'id': 14,
        'authority': {'@jsonTag': 12, 'id': 1, 'commonName': 'EPSign Officials CA', 'registrationDate': '08/03/2012 16:02:17'}
      }, {
        '@jsonTag': 14,
        'id': 13,
        'authority': {'@jsonTag': 13, 'id': 2, 'commonName': 'European Parliament', 'registrationDate': '08/03/2012 16:02:17'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/21',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 15,
      'id': 21,
      'allowedGroups': [{
        '@jsonTag': 12,
        'id': 34,
        'group': {
          '@jsonTag': 12,
          'id': 59,
          'epId': 1208,
          'shortName': 'DG PERSONNEL',
          'fullName': 'Directorate-General for Personnel',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 17,
        'id': 3287,
        'signatureMode': {
          '@jsonTag': 22,
          'id': 250,
          'applet': 0,
          'description': 'prompt.eseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:E-SEAL,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Advanced Electronic Signature',
          'path': null,
          'pinRequest': 1,
          'status': 0,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 15, 'id': 13, 'name': 'SignatoryForAll', 'status': 1},
      'name': 'PAPYRUS',
      'notificationHoursBeforeDeadline': 2,
      'recommendedMode': 22,
      'status': 1,
      'visible': 1,
      'trustedAuthorities': [{
        '@jsonTag': 15,
        'id': 31,
        'authority': {'@jsonTag': 14, 'id': 1, 'commonName': 'EPSign Officials CA', 'registrationDate': '08/03/2012 16:02:17'}
      }, {
        '@jsonTag': 16,
        'id': 39,
        'authority': {'@jsonTag': 15, 'id': 15, 'commonName': 'DEV EPSign ObjectSign CA', 'registrationDate': '14/05/2019 15:38:08'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/22',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 16,
      'id': 22,
      'allowedGroups': [{
        '@jsonTag': 13,
        'id': 15,
        'group': {
          '@jsonTag': 13,
          'id': 1727,
          'epId': 2889,
          'shortName': 'ITEC',
          'fullName': 'Directorate-General for Innovation and Technological Support',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 18,
        'id': 19,
        'signatureMode': {
          '@jsonTag': 23,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }, {
        '@jsonTag': 19,
        'id': 3285,
        'signatureMode': {
          '@jsonTag': 24,
          'id': 250,
          'applet': 0,
          'description': 'prompt.eseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:E-SEAL,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Advanced Electronic Signature',
          'path': null,
          'pinRequest': 1,
          'status': 0,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 16, 'id': 12, 'name': 'PETIGREF', 'status': 1},
      'name': 'PETIGREF',
      'notificationHoursBeforeDeadline': 24,
      'recommendedMode': 23,
      'status': 0,
      'visible': 0,
      'trustedAuthorities': [{
        '@jsonTag': 17,
        'id': 37,
        'authority': {'@jsonTag': 16, 'id': 1, 'commonName': 'EPSign Officials CA', 'registrationDate': '08/03/2012 16:02:17'}
      }, {
        '@jsonTag': 18,
        'id': 36,
        'authority': {'@jsonTag': 17, 'id': 4, 'commonName': 'DiSPEP', 'registrationDate': '08/03/2012 00:00:00'}
      }, {
        '@jsonTag': 19,
        'id': 35,
        'authority': {'@jsonTag': 18, 'id': 6, 'commonName': 'DEV EPSign ROOT CA', 'registrationDate': '06/12/2012 00:00:00'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/28',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 17,
      'id': 28,
      'allowedGroups': [{
        '@jsonTag': 14,
        'id': 26,
        'group': {
          '@jsonTag': 14,
          'id': 2766,
          'epId': 3523,
          'shortName': 'NC',
          'fullName': 'Nouveau Centre',
          'groupType': 'B',
          'isActive': false,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 20,
        'id': 3269,
        'signatureMode': {
          '@jsonTag': 25,
          'id': 250,
          'applet': 0,
          'description': 'prompt.eseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:E-SEAL,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Advanced Electronic Signature',
          'path': null,
          'pinRequest': 1,
          'status': 0,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': true,
      'icon': null,
      'ipCheck': false,
      'isProtected': true,
      'keyType': {'@jsonTag': 17, 'id': 0, 'name': 'Default', 'status': 1},
      'name': 'E-SEAL',
      'notificationHoursBeforeDeadline': 90,
      'recommendedMode': 25,
      'status': 1,
      'visible': 0,
      'trustedAuthorities': [{
        '@jsonTag': 20,
        'id': 27,
        'authority': {'@jsonTag': 19, 'id': 6, 'commonName': 'DEV EPSign ROOT CA', 'registrationDate': '06/12/2012 00:00:00'}
      }, {
        '@jsonTag': 21,
        'id': 40,
        'authority': {'@jsonTag': 20, 'id': 14, 'commonName': 'Advanced Electronic Signature', 'registrationDate': '14/05/2019 15:37:26'}
      }],
      'workflowType': 'SEQUENTIAL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/29',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 18,
      'id': 29,
      'allowedGroups': [{
        '@jsonTag': 15,
        'id': 30,
        'group': {
          '@jsonTag': 15,
          'id': 2766,
          'epId': 3523,
          'shortName': 'NC',
          'fullName': 'Nouveau Centre',
          'groupType': 'B',
          'isActive': false,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 21,
        'id': 3279,
        'signatureMode': {
          '@jsonTag': 26,
          'id': 250,
          'applet': 0,
          'description': 'prompt.eseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:E-SEAL,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Advanced Electronic Signature',
          'path': null,
          'pinRequest': 1,
          'status': 0,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': true,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 18, 'id': 2, 'name': 'Flexible', 'status': 1},
      'name': 'CFU Profile',
      'notificationHoursBeforeDeadline': 90,
      'recommendedMode': 26,
      'status': 1,
      'visible': 1,
      'trustedAuthorities': [{
        '@jsonTag': 22,
        'id': 28,
        'authority': {'@jsonTag': 21, 'id': 4, 'commonName': 'DiSPEP', 'registrationDate': '08/03/2012 00:00:00'}
      }],
      'workflowType': 'SEQUENTIAL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/31',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 19,
      'id': 31,
      'allowedGroups': [{
        '@jsonTag': 16,
        'id': 35,
        'group': {
          '@jsonTag': 16,
          'id': 59,
          'epId': 1208,
          'shortName': 'DG PERSONNEL',
          'fullName': 'Directorate-General for Personnel',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 22,
        'id': 3283,
        'signatureMode': {
          '@jsonTag': 27,
          'id': 251,
          'applet': 0,
          'description': 'prompt.qeseal.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES_BASELINE_B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'Qualified Electronic Seal',
          'path': 'es0136',
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_FLEXIBLE_OPTIONAL',
      'fileRead': false,
      'icon': null,
      'ipCheck': false,
      'isProtected': false,
      'keyType': {'@jsonTag': 19, 'id': 13, 'name': 'SignatoryForAll', 'status': 1},
      'name': 'QE-Seal PAPYRUS',
      'notificationHoursBeforeDeadline': 90,
      'recommendedMode': 27,
      'status': 1,
      'visible': 1,
      'trustedAuthorities': [{
        '@jsonTag': 23,
        'id': 30,
        'authority': {'@jsonTag': 22, 'id': 1, 'commonName': 'EPSign Officials CA', 'registrationDate': '08/03/2012 16:02:17'}
      }],
      'workflowType': 'PARALLEL'
    }
  }, {
    'links': [{
      'rel': 'self',
      'href': 'http://dispdv.in.ep.europa.eu/disp/api/v1/admin/signatureTypes/32',
      'hreflang': null,
      'media': null,
      'title': null,
      'type': null,
      'deprecation': null
    }], 'content': {
      '@jsonTag': 20,
      'id': 32,
      'allowedGroups': [{
        '@jsonTag': 17,
        'id': 36,
        'group': {
          '@jsonTag': 17,
          'id': 1727,
          'epId': 2889,
          'shortName': 'ITEC',
          'fullName': 'Directorate-General for Innovation and Technological Support',
          'groupType': 'S',
          'isActive': true,
          'users': null
        }
      }],
      'allowedModes': [{
        '@jsonTag': 23,
        'id': 3284,
        'signatureMode': {
          '@jsonTag': 28,
          'id': 2,
          'applet': 0,
          'description': 'prompt.pincode.description',
          'dssParams': 'signature_format:PAdES,signature_packaging:ENVELOPED,signature_level:PAdES-BASELINE-B,usage:SIGN,signature_policy_hash:SHA512,signature_policy_algo:RSA',
          'fileTypeSupport': 'FILE_PDF',
          'name': 'PinCode (PADES)',
          'path': null,
          'pinRequest': 1,
          'status': 1,
          'type': 'PIN'
        }
      }],
      'deadlineType': 'DEADLINE_TYPE_STRONG_MANDATORY',
      'fileRead': false,
      'icon': null,
      'ipCheck': true,
      'isProtected': false,
      'keyType': {'@jsonTag': 20, 'id': 13, 'name': 'SignatoryForAll', 'status': 1},
      'name': 'OneSignatoryForAll ',
      'notificationHoursBeforeDeadline': 90,
      'recommendedMode': 28,
      'status': 1,
      'visible': 1,
      'trustedAuthorities': [{
        '@jsonTag': 24,
        'id': 32,
        'authority': {'@jsonTag': 23, 'id': 1, 'commonName': 'EPSign Officials CA', 'registrationDate': '08/03/2012 16:02:17'}
      }],
      'workflowType': 'PARALLEL'
    }
  }], 'page': {'size': 2000, 'totalElements': 20, 'totalPages': 1, 'number': 0}
};
