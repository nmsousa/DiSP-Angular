// tslint:disable
export const mockTemplates: any = {
  "links": [
    {
      "rel": "self",
      "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates?page=0&size=10&sort=id,asc",
      "hreflang": null,
      "media": null,
      "title": null,
      "type": null,
      "deprecation": null
    }
  ],
  "content": [
    {
      "links": [
        {
          "rel": "self",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1469",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "deactivateTemplate",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1469",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1469/associations",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1469/associations/{associationId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1469/thirdParties",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1469/thirdParties/{thirdPartyId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        }
      ],
      "content": {
        "@jsonTag": 1,
        "id": 1469,
        "creationDate": "24/02/2020 16:17:42",
        "signatureType": {
          "@jsonTag": 1,
          "id": 1,
          "allowedGroups": null,
          "allowedModes": null,
          "deadlineType": "DEADLINE_TYPE_STRONG_MANDATORY",
          "fileRead": true,
          "icon": null,
          "ipCheck": false,
          "isProtected": false,
          "keyType": null,
          "name": "Type A",
          "notificationHoursBeforeDeadline": 2,
          "recommendedMode": null,
          "status": 1,
          "visible": 1,
          "trustedAuthorities": null,
          "workflowType": "SEQUENTIAL"
        },
        "status": 1,
        "templateAssociations": [
          {
            "@jsonTag": 1,
            "id": 747,
            "assignmentOrder": 1,
            "role": "ROLE_SIGNATORY",
            "user": {
              "@jsonTag": 1,
              "fullName": "Fabio PACHECO",
              "id": 477048,
              "isActive": true,
              "details": null,
              "email": "fabio.pacheco@ext.europarl.europa.eu",
              "epId": 195224,
              "firstname": "Fabio",
              "lastname": "PACHECO",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "fpacheco"
            }
          },
          {
            "@jsonTag": 2,
            "id": 748,
            "assignmentOrder": 2,
            "role": "ROLE_SIGNATORY",
            "user": {
              "@jsonTag": 2,
              "fullName": "Todor TODOROV",
              "id": 15205,
              "isActive": true,
              "details": null,
              "email": "todor.todorov@europarl.europa.eu",
              "epId": 111256,
              "firstname": "Todor",
              "lastname": "TODOROV",
              "groups": null,
              "preferences": null,
              "userType": "AGENT",
              "username": "totodorov"
            }
          },
          {
            "@jsonTag": 3,
            "id": 751,
            "assignmentOrder": null,
            "role": "ROLE_AS_CREATOR",
            "user": 2
          },
          {
            "@jsonTag": 4,
            "id": 757,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_USER",
            "user": 1
          },
          {
            "@jsonTag": 5,
            "id": 753,
            "assignmentOrder": null,
            "role": "ROLE_AS_CONSUMER",
            "user": {
              "@jsonTag": 3,
              "fullName": "Yao Hamed ADOU",
              "id": 477326,
              "isActive": true,
              "details": null,
              "email": "yaohamed.adou@ext.europarl.europa.eu",
              "epId": 196254,
              "firstname": "Yao Hamed",
              "lastname": "ADOU",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "yadou"
            }
          },
          {
            "@jsonTag": 6,
            "id": 754,
            "assignmentOrder": null,
            "role": "ROLE_AS_CONSUMER",
            "user": 2
          },
          {
            "@jsonTag": 7,
            "id": 755,
            "assignmentOrder": null,
            "role": "ROLE_AS_CONSUMER",
            "user": 1
          },
          {
            "@jsonTag": 8,
            "id": 756,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_OWNER",
            "user": 1
          },
          {
            "@jsonTag": 9,
            "id": 750,
            "assignmentOrder": null,
            "role": "ROLE_AS_SIGNATORY",
            "user": 1
          },
          {
            "@jsonTag": 10,
            "id": 749,
            "assignmentOrder": null,
            "role": "ROLE_AS_SIGNATORY",
            "user": 3
          },
          {
            "@jsonTag": 11,
            "id": 752,
            "assignmentOrder": null,
            "role": "ROLE_AS_CREATOR",
            "user": 1
          }
        ],
        "templateThirdParty": [

        ],
        "title": "FABIO TEMPLATE UPDATED"
      }
    },
    {
      "links": [
        {
          "rel": "self",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1532",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "deactivateTemplate",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1532",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1532/associations",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1532/associations/{associationId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1532/thirdParties",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1532/thirdParties/{thirdPartyId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        }
      ],
      "content": {
        "@jsonTag": 2,
        "id": 1532,
        "creationDate": "17/06/2019 10:54:02",
        "signatureType": {
          "@jsonTag": 2,
          "id": 11,
          "allowedGroups": null,
          "allowedModes": null,
          "deadlineType": "DEADLINE_TYPE_FLEXIBLE_OPTIONAL",
          "fileRead": true,
          "icon": null,
          "ipCheck": true,
          "isProtected": true,
          "keyType": null,
          "name": "Sequential",
          "notificationHoursBeforeDeadline": 2,
          "recommendedMode": null,
          "status": 1,
          "visible": 1,
          "trustedAuthorities": null,
          "workflowType": "SEQUENTIAL"
        },
        "status": 1,
        "templateAssociations": [
          {
            "@jsonTag": 12,
            "id": 710,
            "assignmentOrder": 1,
            "role": "ROLE_SIGNATORY",
            "user": {
              "@jsonTag": 4,
              "fullName": "Ptest MEP",
              "id": 431183,
              "isActive": true,
              "details": null,
              "email": "ptest.mep@ext.europarl.europa.eu",
              "epId": 31,
              "firstname": "Ptest",
              "lastname": "MEP",
              "groups": null,
              "preferences": null,
              "userType": null,
              "username": "ptestmep"
            }
          },
          {
            "@jsonTag": 13,
            "id": 711,
            "assignmentOrder": 2,
            "role": "ROLE_SIGNATORY",
            "user": {
              "@jsonTag": 5,
              "fullName": "MEP 1",
              "id": 1,
              "isActive": true,
              "details": null,
              "email": "mep1@xxx.com",
              "epId": 1,
              "firstname": "MEP",
              "lastname": "1",
              "groups": null,
              "preferences": null,
              "userType": "AGENT",
              "username": "MEP1"
            }
          },
          {
            "@jsonTag": 14,
            "id": 712,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_OWNER",
            "user": 4
          },
          {
            "@jsonTag": 15,
            "id": 713,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_USER",
            "user": 4
          }
        ],
        "templateThirdParty": [

        ],
        "title": "JUNIT TEST TEMPLATE"
      }
    },
    {
      "links": [
        {
          "rel": "self",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1707",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "deactivateTemplate",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1707",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1707/associations",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1707/associations/{associationId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1707/thirdParties",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1707/thirdParties/{thirdPartyId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        }
      ],
      "content": {
        "@jsonTag": 3,
        "id": 1707,
        "creationDate": "25/09/2019 15:14:44",
        "signatureType": {
          "@jsonTag": 3,
          "id": 1,
          "allowedGroups": null,
          "allowedModes": null,
          "deadlineType": "DEADLINE_TYPE_STRONG_MANDATORY",
          "fileRead": true,
          "icon": null,
          "ipCheck": false,
          "isProtected": false,
          "keyType": null,
          "name": "Type A",
          "notificationHoursBeforeDeadline": 2,
          "recommendedMode": null,
          "status": 1,
          "visible": 1,
          "trustedAuthorities": null,
          "workflowType": "SEQUENTIAL"
        },
        "status": 1,
        "templateAssociations": [
          {
            "@jsonTag": 16,
            "id": 726,
            "assignmentOrder": 1,
            "role": "ROLE_SIGNATORY",
            "user": {
              "@jsonTag": 6,
              "fullName": "Fabio PACHECO",
              "id": 477048,
              "isActive": true,
              "details": null,
              "email": "fabio.pacheco@ext.europarl.europa.eu",
              "epId": 195224,
              "firstname": "Fabio",
              "lastname": "PACHECO",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "fpacheco"
            }
          },
          {
            "@jsonTag": 17,
            "id": 728,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_USER",
            "user": 6
          },
          {
            "@jsonTag": 18,
            "id": 727,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_OWNER",
            "user": 6
          }
        ],
        "templateThirdParty": [

        ],
        "title": "TEST 333"
      }
    },
    {
      "links": [
        {
          "rel": "self",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1708",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "deactivateTemplate",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1708",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1708/associations",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1708/associations/{associationId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1708/thirdParties",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1708/thirdParties/{thirdPartyId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        }
      ],
      "content": {
        "@jsonTag": 4,
        "id": 1708,
        "creationDate": "26/09/2019 12:38:14",
        "signatureType": {
          "@jsonTag": 4,
          "id": 1,
          "allowedGroups": null,
          "allowedModes": null,
          "deadlineType": "DEADLINE_TYPE_STRONG_MANDATORY",
          "fileRead": true,
          "icon": null,
          "ipCheck": false,
          "isProtected": false,
          "keyType": null,
          "name": "Type A",
          "notificationHoursBeforeDeadline": 2,
          "recommendedMode": null,
          "status": 1,
          "visible": 1,
          "trustedAuthorities": null,
          "workflowType": "SEQUENTIAL"
        },
        "status": 1,
        "templateAssociations": [
          {
            "@jsonTag": 19,
            "id": 729,
            "assignmentOrder": 1,
            "role": "ROLE_SIGNATORY",
            "user": {
              "@jsonTag": 7,
              "fullName": "Fabio PACHECO",
              "id": 477048,
              "isActive": true,
              "details": null,
              "email": "fabio.pacheco@ext.europarl.europa.eu",
              "epId": 195224,
              "firstname": "Fabio",
              "lastname": "PACHECO",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "fpacheco"
            }
          },
          {
            "@jsonTag": 20,
            "id": 731,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_USER",
            "user": 7
          },
          {
            "@jsonTag": 21,
            "id": 730,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_OWNER",
            "user": 7
          }
        ],
        "templateThirdParty": [

        ],
        "title": "TET 33333"
      }
    },
    {
      "links": [
        {
          "rel": "self",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1769",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "deactivateTemplate",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1769",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1769/associations",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1769/associations/{associationId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1769/thirdParties",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1769/thirdParties/{thirdPartyId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        }
      ],
      "content": {
        "@jsonTag": 5,
        "id": 1769,
        "creationDate": "06/05/2020 18:55:22",
        "signatureType": {
          "@jsonTag": 5,
          "id": 11,
          "allowedGroups": null,
          "allowedModes": null,
          "deadlineType": "DEADLINE_TYPE_FLEXIBLE_OPTIONAL",
          "fileRead": true,
          "icon": null,
          "ipCheck": true,
          "isProtected": true,
          "keyType": null,
          "name": "Sequential",
          "notificationHoursBeforeDeadline": 2,
          "recommendedMode": null,
          "status": 1,
          "visible": 1,
          "trustedAuthorities": null,
          "workflowType": "SEQUENTIAL"
        },
        "status": 1,
        "templateAssociations": [
          {
            "@jsonTag": 22,
            "id": 758,
            "assignmentOrder": 1,
            "role": "ROLE_SIGNATORY",
            "user": {
              "@jsonTag": 8,
              "fullName": "Nuno SOUSA",
              "id": 481162,
              "isActive": true,
              "details": null,
              "email": "nuno.sousa@ext.europarl.europa.eu",
              "epId": 200028,
              "firstname": "Nuno",
              "lastname": "SOUSA",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "nsousa"
            }
          },
          {
            "@jsonTag": 23,
            "id": 759,
            "assignmentOrder": 2,
            "role": "ROLE_SIGNATORY",
            "user": {
              "@jsonTag": 9,
              "fullName": "Fabio PACHECO",
              "id": 477048,
              "isActive": true,
              "details": null,
              "email": "fabio.pacheco@ext.europarl.europa.eu",
              "epId": 195224,
              "firstname": "Fabio",
              "lastname": "PACHECO",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "fpacheco"
            }
          },
          {
            "@jsonTag": 24,
            "id": 766,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_USER",
            "user": 8
          },
          {
            "@jsonTag": 25,
            "id": 763,
            "assignmentOrder": null,
            "role": "ROLE_AS_CREATOR",
            "user": {
              "@jsonTag": 10,
              "fullName": "ANDERSON BENIGNO LOPES",
              "id": 483328,
              "isActive": true,
              "details": null,
              "email": "anderson.benignolopes@ext.europarl.europa.eu",
              "epId": 205397,
              "firstname": "ANDERSON",
              "lastname": "BENIGNO LOPES",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "abenignolopes"
            }
          },
          {
            "@jsonTag": 26,
            "id": 764,
            "assignmentOrder": null,
            "role": "ROLE_AS_CONSUMER",
            "user": 10
          },
          {
            "@jsonTag": 27,
            "id": 765,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_OWNER",
            "user": 8
          },
          {
            "@jsonTag": 28,
            "id": 761,
            "assignmentOrder": null,
            "role": "ROLE_AS_CREATOR",
            "user": {
              "@jsonTag": 11,
              "fullName": "Yao Hamed ADOU",
              "id": 477326,
              "isActive": true,
              "details": null,
              "email": "yaohamed.adou@ext.europarl.europa.eu",
              "epId": 196254,
              "firstname": "Yao Hamed",
              "lastname": "ADOU",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "yadou"
            }
          },
          {
            "@jsonTag": 29,
            "id": 760,
            "assignmentOrder": null,
            "role": "ROLE_AS_SIGNATORY",
            "user": 8
          },
          {
            "@jsonTag": 30,
            "id": 762,
            "assignmentOrder": null,
            "role": "ROLE_AS_CREATOR",
            "user": 9
          }
        ],
        "templateThirdParty": [

        ],
        "title": "PRIMEIRO TEMPLATE"
      }
    },
    {
      "links": [
        {
          "rel": "self",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1773",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "deactivateTemplate",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1773",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1773/associations",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1773/associations/{associationId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1773/thirdParties",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1773/thirdParties/{thirdPartyId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        }
      ],
      "content": {
        "@jsonTag": 6,
        "id": 1773,
        "creationDate": "08/05/2020 17:48:56",
        "signatureType": null,
        "status": 1,
        "templateAssociations": [

        ],
        "templateThirdParty": [
          {
            "@jsonTag": 1,
            "id": 40,
            "email": "fabio.pacheco@ext.europarl.europa.eu"
          }
        ],
        "title": "TEST 3332222"
      }
    },
    {
      "links": [
        {
          "rel": "self",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1777",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "deactivateTemplate",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1777",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1777/associations",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateAssociation",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1777/associations/{associationId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "addTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1777/thirdParties",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        },
        {
          "rel": "removeTemplateThirdParty",
          "href": "http://localhost:8081/disp-web-2.10.0/api/v1/admin/templates/1777/thirdParties/{thirdPartyId}",
          "hreflang": null,
          "media": null,
          "title": null,
          "type": null,
          "deprecation": null
        }
      ],
      "content": {
        "@jsonTag": 7,
        "id": 1777,
        "creationDate": "11/05/2020 11:45:32",
        "signatureType": {
          "@jsonTag": 6,
          "id": 1,
          "allowedGroups": null,
          "allowedModes": null,
          "deadlineType": "DEADLINE_TYPE_STRONG_MANDATORY",
          "fileRead": true,
          "icon": null,
          "ipCheck": false,
          "isProtected": false,
          "keyType": null,
          "name": "Type A",
          "notificationHoursBeforeDeadline": 2,
          "recommendedMode": null,
          "status": 1,
          "visible": 1,
          "trustedAuthorities": null,
          "workflowType": "SEQUENTIAL"
        },
        "status": 1,
        "templateAssociations": [
          {
            "@jsonTag": 31,
            "id": 779,
            "assignmentOrder": null,
            "role": "ROLE_AS_SIGNATORY",
            "user": {
              "@jsonTag": 12,
              "fullName": "Fabio PACHECO",
              "id": 477048,
              "isActive": true,
              "details": null,
              "email": "fabio.pacheco@ext.europarl.europa.eu",
              "epId": 195224,
              "firstname": "Fabio",
              "lastname": "PACHECO",
              "groups": null,
              "preferences": null,
              "userType": "EXTERNE",
              "username": "fpacheco"
            }
          },
          {
            "@jsonTag": 32,
            "id": 780,
            "assignmentOrder": null,
            "role": "ROLE_AS_CREATOR",
            "user": 12
          },
          {
            "@jsonTag": 33,
            "id": 783,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_USER",
            "user": 12
          },
          {
            "@jsonTag": 34,
            "id": 782,
            "assignmentOrder": null,
            "role": "ROLE_TEMPLATE_OWNER",
            "user": 12
          },
          {
            "@jsonTag": 35,
            "id": 781,
            "assignmentOrder": null,
            "role": "ROLE_AS_CONSUMER",
            "user": 12
          }
        ],
        "templateThirdParty": [
          {
            "@jsonTag": 2,
            "id": 42,
            "email": "test@europarl.europa.eu"
          }
        ],
        "title": "TEST 333222"
      }
    }
  ],
  "page": {
    "size": 10,
    "totalElements": 7,
    "totalPages": 1,
    "number": 0
  }
};
