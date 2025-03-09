const SORT_TYPE = {
    DESC: 'desc',
    ASC: 'asc'
  };
  
  const QUEUE_STATUS = {
    CREATED: 'created',
    PUSHED: 'pushed',
    SENT: 'sent',
    DELETED: 'deleted'
  };
  
  const MAXIMUM_LIMIT_SIZE = 500;
  const TTL_FOR_QUERY = 60 * 15;
  const TTL_FOR_ID = 60 * 30;
  
  const SEND_STATUS = {
    PROCESSING: 'processing',
    SENT: 'sent',
    ERROR: 'error'
  };
  
  const DOMAIN_TYPE = {
    RADAA: 'radaa',
    KOMPA: 'kompa',
    REPORT247: 'report247'
  };
  
  const EMAIL_TO_TYPE = {
    TO: 'to',
    CC: 'cc',
    BCC: 'bcc'
  };
  
  const TYPE_TO_SEND = {
    ALERT: 'alert',
    REPORT: 'report',
    AUTHENTICATE: 'authenticate'
  };
  
  const USER_ROLE = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    BUSINESS: 'business',
    ANALYSIS: 'analysis',
    CUSTOMER: 'customer',
    GUEST: 'guest'
  };
  
  const USER_GROUP = {
    ADMINISTRATOR: 'administrator',
    CONSULTING: 'consulting'
  };
  
  const SHARED_STATUS = {
    INACTIVE: 'inactive',
    ACTIVE: 'active',
    DEACTIVE: 'deactive',
    DELETED: 'deleted'
  };
  
  const FROM_EMAIL_ALERT_RADAA = 'notification@radaa.net';
  const FROM_EMAIL_REPORT_RADAA = 'goodday@radaa.net';
  const FROM_NAME_RADAA = 'Radaa System';
  
  const FROM_EMAIL_ALERT_KOMPA = 'notification@kompa.vn';
  const FROM_EMAIL_REPORT_KOMPA = 'goodday@kompa.vn';
  const FROM_NAME_KOMPA = 'Kompa Media Notification';
  
  export {
    SORT_TYPE,
    QUEUE_STATUS,
    SEND_STATUS,
    DOMAIN_TYPE,
    EMAIL_TO_TYPE,
    TYPE_TO_SEND,
    FROM_EMAIL_REPORT_RADAA,
    FROM_EMAIL_ALERT_RADAA,
    FROM_NAME_RADAA,
    FROM_EMAIL_ALERT_KOMPA,
    FROM_EMAIL_REPORT_KOMPA,
    FROM_NAME_KOMPA,
    USER_ROLE,
    USER_GROUP,
    SHARED_STATUS,
    MAXIMUM_LIMIT_SIZE,
    TTL_FOR_QUERY,
    TTL_FOR_ID
  };
  