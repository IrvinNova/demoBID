export const environment = {
    production: true,
    debug: false,
  
    // credentials
    user: 'fbe',
    password: 'password',
    encoded: 'dXNlcmFwcDpwYXNzd29yZA==',
  
    // logo
    logo: '/assets/LOGO.png',
    ocr_timeout: 2000,
  
    // urls
    servicesURL: 'http://apiqa.buroidentidad.com',
  
    // codes
    okCode: -9999,
    appPermission: 9,
    mexico_id: 127,
    cdmx_id: 9,
    map_key: 'AIzaSyDVbHKUNntc-jWtK5yfU69Ve0zgxRyLjAw',
  
    // servicios
    authService: ':8083/uaa/oauth/token',
    loginService: ':9419/bid/rest/v1/login',
    catProducts: ':9417/bid/rest/v1/product/getProducts',
    catAgreement: ':9414/bid/rest/v1/agreements/assignProduct?idProduct=',
    catNombraminento: ':9414/bid/rest/v1/amount/listAmount?idAgreement=',
    allTerms: ':9414/bid/rest/v1/formulas/allTerms?idAgreement=',
    allAmmounts: ':9414/bid/rest/v1/formulas/allAmounts?idAgreement=',
    ocr: ':9411/bid/rest/v1/enrollment/ocr/document',
    saveDoc: ':9411/bid/rest/v1/documents/upload',
    enrrolFingers: ':9420/bid/fingerEnrollment/enrollment',
    updatePerson: ':9436/bid/rest/v1/people/upload',
    queryIne: ':9429/bid/rest/v1/ine/validation',
    identifyEnroll: ':9420/bid/fingerIdentification/identify',
    ocr_cd: ':9411/bid/rest/v1/enrollment/ocr/cd',
    save_credit: ':9414/bid/rest/v1/credit/',
    save_references: ':9414/bid/rest/v1/reference/',
    cat_country: ':9415/bid/rest/v1/catalogues/selector?value=country',
    cat_state: ':9415/bid/rest/v1/catalogues/selector?value=state',
    cat_city: ':9415/bid/rest/v1/catalogues/selector?value=city&filter=',
    cat_town: ':9415/bid/rest/v1/catalogues/selector?value=town&filter=',
    operation_create: ':9411/bid/rest/v1/operations',
    save_doc_resp: ':9431/bid/rest/v1/files/images',
    face_serv: ':9423/bid/rest/v1/enrollment/facial',
    curp_validate: ':9426/bid/rest/v1/renapo/napi/curp',
    direction_serv: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=<address>&key=',
    
    // storage
    token: 'auth_token',
    session: 'session_data',
    client: 'client_data',
    credit: 'credit_data',
    fingers: 'fingers_data',
    operation: 'operation_data',
    person: 'person_data',
    agente: 'agent_data',
    leftIndex: 'leftIndex',
    rightIndex: 'rightIndex',
    dataOcr: 'dataPerson',
    newClient: 'newClient',
    operationClient: 'operationClient',
    person_adress: 'person_adress',
    product: 'selected_product',
    agreement: 'selected_agreement',
    appointment: 'selected_appointment',
    dataClient: 'datosCliente',
    leftFingersC: 'leftFingersC',
    rightFingersC: 'rightFingersC',
    fingers_storage: 'fingers_storage',
    face_storage: 'face_storage',
    same_adress: 'same_adress'
  };
  