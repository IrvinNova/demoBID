import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../bid/services/storage.service';
import { Credit } from 'src/app/classes/model/credit';
import { Device } from '@ionic-native/device/ngx';
import { Agreement } from 'src/app/classes/model/agreement';
import { NumbersService } from '../../bid/services/numbers.service';

@Injectable({
    providedIn: 'root'
})

export class ReadDocument {

    public credito: any;
    public agreement: any;
    public data_client: any;
    public email: any;
    public address: any;
    public periodicidad: any;
    public semanal: any;
    public quincenal: any;
    public catorcenal: any;
    public mensual: any;
    public plazo_letra: any;
    public estado: any;
    public ciudad: any;
    public colonia: any;
    public banco: any;
    public agent: any;
    public agent_name: any;
    public claveEjecutivo: any;
    public telefono: any;
    public masculino: any;
    public femenino: any;
    public fechaNac: any;
    public diaNac: any;
    public mesNac: any;
    public anioNac: any;
    public fecha = new Date();
    public dia: any;
    public mes: any;
    public anio: any;
    public fechaLab: any;
    public diaLab: any;
    public mesLab: any;
    public anioLab: any;
    public antiguedad: any;
    public workAddress: any;
    public referencias: any;
    public kyc: any;
    public politicoSi: any;
    public politicoNo: any;
    public ingresosSi: any;
    public ingresosNo: any;
    public autoSi: any;
    public autoNo: any;
    public aceptaSi: any;
    public aceptaNo: any;
    public operationId: any;
    public clabe: any;
    public sex: any;
    public token: any;

    constructor(private http: HttpClient, private storage: StorageService, private numbers: NumbersService, private device: Device) { 
        this.ionViewDidEnter();
    }

    async ionViewDidEnter() {
        this.credito = new Credit();
        this.token = await this.storage.get(environment.token);
        this.credito = await this.storage.get(environment.credit);
        console.log('Credito FInal', this.credito);
        this.agreement = new Agreement();
        this.agreement = await this.storage.get(environment.agreement);
        console.log('Agreement Final', this.agreement);
        this.data_client = await this.storage.get(environment.dataOcr);
        console.log('Client Data Final', this.data_client);
        this.address = await this.storage.get(environment.person_adress);
        console.log('Address Final', this.address);
        this.email = await this.storage.get(environment.email);
        console.log('Email Final', this.email);
        this.telefono = await this.storage.get(environment.telefono);
        console.log('Telefono Final', this.telefono);
        this.agent = await this.storage.get(environment.agente);
        console.log('Agente Final', this.agent);
        this.operationId = await this.storage.get(environment.operation);
        console.log('Operation ID Final', this.operationId);
        this.kyc = await this.storage.get(environment.kyc);
        console.log('KYC Final', this.kyc);
        this.agent_name = this.agent.name + ' ' + this.agent.lastname + ' ' + this.agent.middleName;

        if (this.kyc.exposed === "si") {
            this.politicoNo = '';
            this.politicoSi = 'X';
        } else {
            if (this.kyc.exposed === 'no') {
                this.politicoNo = 'X';
                this.politicoSi = '';
            } else {
                this.politicoNo = '';
                this.politicoSi = '';
            }
        }

        if (this.kyc.adicionales === 'si') {
            this.ingresosNo = '';
            this.ingresosSi = 'X';
        } else {
            if (this.kyc.adicionales === 'no') {
                this.ingresosNo = 'X';
                this.ingresosSi = '';
            } else {
                this.ingresosNo = '';
                this.ingresosSi = '';
            }
        }

        if (this.kyc.auto === 'si') {
            this.autoNo = '';
            this.autoSi = 'X';
        } else {
            if (this.kyc.auto === 'no') {
                this.autoNo = 'X';
                this.autoSi = '';
            } else {
                this.autoNo = '';
                this.autoSi = '';
            }
        }
    }

    generaDoc (code, token) {

        console.log('Codigo Doc', code);
        const docType = "0";
        const firmaAuth = "";
        const firmaBio = "";
        this.aceptaNo = "";
        this.aceptaSi = "";

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        return this.http.post(environment.servicesURL + environment.generateDoc, JSON.stringify(this.generarJsonDoc(code, docType, firmaAuth, firmaBio)), {headers});

    }

    generaDocFirma (code, token, firmaAuth, firmaBio, operation, userId) {

        console.log('Codigo Doc', code);
        const docType = "1";
        this.aceptaNo = "";
        this.aceptaSi = "X";

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        var pdf = this.http.post(environment.servicesURL + environment.generateDoc, JSON.stringify(this.generarJsonDoc(code, docType, firmaAuth, firmaBio)), {headers});

        this.saveDocuments(pdf, code, operation, userId, token);

        return pdf;

    }

    saveDocuments(pdf, code, operationId, userId, token) {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          });

         return this.http.post(environment.servicesURL + environment.saveDoc, JSON.stringify(this.generateJsonSaveDoc(pdf, code, operationId, userId)), {headers});
    }

    generateJsonSaveDoc(pdf, code, operationId, userId) {
        const jsonF = {
            operationId: operationId,
            metadata: {
              deviceinfo: this.device.platform + ' ' + this.device.version + ' - ' + this.device.model + ' - ' +this.device.manufacturer,
              userId: userId
            },
            data: {
              documents: [
                {
                  documentCode: code,
                  file: pdf
                }
              ]
            }
           
          }
          console.log('Json Imagen', JSON.stringify(jsonF));
          return jsonF;
      
    }

    generarJsonDoc (code, docType, firmaAuth, firmaBio) {

        let jsonDoc: any;

        if (docType === "0") {
            if (code === "DXNC") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos:[
                            {
                            nombre:"nombre_producto",
                            valor: this.credito.product_name
                            },{
                            nombre:"tipo_credito",
                            valor: this.credito.agreement_name
                            },{
                            nombre:"cat",
                            valor: this.agreement.cat
                            },{
                            nombre:"ti_anual",
                            valor: this.agreement.annualInterestRate
                            },{
                            nombre:"monto_linea",
                            valor: this.credito.ammount
                            },{
                            nombre:"monto_total",
                            valor: this.credito.total_pay
                            },{
                            nombre:"plazo_credito",
                            valor: this.credito.terms
                            },{
                            nombre:"fecha_corte",
                            valor:""
                            },{
                            nombre:"fecha_limite_pago",
                            valor:""
                            },{
                            nombre:"meses",
                            valor: this.credito.terms
                            },{
                            nombre:"dia_fecha",
                            valor: this.dia
                            },{
                            nombre:"mes_fecha",
                            valor: this.mes
                            },{
                            nombre:"anio_fecha",
                            valor: this.anio
                            },{
                            nombre:"nombreSolicitante",
                            valor: this.data_client.nombre
                            },{
                            nombre:"ap_paterno_cliente",
                            valor: this.data_client.aPaterno
                            },{
                            nombre:"ap_materno_cliente",
                            valor: this.data_client.aMaterno
                            },{
                            nombre:"RFC",
                            valor: this.data_client.rfc
                            },{
                            nombre:"email",
                            valor: this.email
                            },{
                            nombre:"aceptContratoSi",
                            valor: this.aceptaSi
                            },{
                            nombre:"aceptContratoNo",
                            valor: this.aceptaNo
                            }
                        ]
                    }
                }
            }
    
            if (code === "DXNCARINS"){
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos: [
                            {
                                nombre: "lugar_expedicion",
                                valor: "México"
                            },
                            {
                                nombre: "rightindex",
                                valor: firmaBio
                            },
                            {
                                nombre: "dia_fecha",
                                valor: this.dia
                            },
                            {
                                nombre: "diag_dia_mes",
                                valor: "/"
                            },
                            {
                                nombre: "mes_fecha",
                                valor: this.mes
                            },
                            {
                                nombre: "diag_mes_anio",
                                valor: "/"
                            },
                            {
                                nombre: "anio_fecha",
                                valor: this.anio
                            },
                            {
                                nombre: "no_contrato",
                                valor: this.credito.folio
                            },
                            {
                                nombre: "nombreSolicitante",
                                valor: this.data_client.nombre
                            },
                            {
                                nombre: "ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                            },
                            {
                                nombre: "ap_materno_cliente",
                                valor: this.data_client.aMaterno
                            },
                            {
                                nombre: "matricula_nss",
                                valor: "1231324"
                            },
                            {
                                nombre: "delegacion",
                                valor: this.address.delegacion
                            },
                            {
                                nombre: "clave",
                                valor: "32123132"
                            },
                            {
                                nombre: "trabajador",
                                valor: "X"
                            },
                            {
                                nombre: "jubilado_pensionado",
                                valor: "X"
                            },
                            {
                                nombre: "pensionado",
                                valor: "X"
                            },
                            {
                                nombre: "clave_00",
                                valor: "X"
                            },
                            {
                                nombre: "clave_01",
                                valor: "X"
                            },
                            {
                                nombre: "clave_04",
                                valor: "X"
                            },
                            {
                                nombre: "clave_10",
                                valor: "X"
                            },
                            {
                                nombre: "clave_11",
                                valor: "X"
                            },
                            {
                                nombre: "ti_mensual",
                                valor: this.agreement.monthlyInterestRate
                            },
                            {
                                nombre: "cat",
                                valor: this.agreement.cat
                            },
                            {
                                nombre: "monto_sol",
                                valor: this.credito.ammount
                            },
                            {
                                nombre: "descuento",
                                valor: this.credito.discount
                            },
                            {
                                nombre: "total_descuentos",
                                valor: this.credito.terms
                            },
                            {
                                nombre: "frec_quincenal",
                                valor: this.quincenal
                            },
                            {
                                nombre: "frec_mensual",
                                valor: this.mensual
                            },
                            {
                                nombre: "total_pago_intereses",
                                valor: this.credito.total_pay - this.credito.ammount
                            },
                            {
                                nombre: "cuenta_clabe",
                                valor: this.clabe
                            },
                            {
                                nombre: "banco",
                                valor: this.banco
                            }
                        ]
                    }
                }
            }
    
            if (code === "DXNFAUT2") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos: [
                            {
                                nombre: "lugar_expedicion",
                                valor: "México"
                            },
                            {
                                nombre: "dia_fecha",
                                valor: this.dia
                            },
                            {
                                nombre: "mes_fecha",
                                valor: this.mes
                            },
                            {
                                nombre: "anio_fecha",
                                valor: this.anio
                            },
                            {
                                nombre: "retenedor",
                                valor: ""
                            },
                            {
                                nombre: "importe_pago",
                                valor: this.credito.discount
                            },
                            {
                                nombre: "importe_pago_letra",
                                valor: this.numbers.NumeroALetras(this.credito.discount)
                            },
                            {
                                nombre: "plazo_solicitado",
                                valor: this.credito.terms
                            },
                            {
                                nombre: "frec_semanal",
                                valor: this.semanal
                            },
                            {
                                nombre: "frec_catorcenal",
                                valor: this.catorcenal
                            },
                            {
                                nombre: "frec_quincenal",
                                valor: this.quincenal
                            },
                            {
                                nombre: "frec_mensual",
                                valor: this.mensual
                            },
                            {
                                nombre: "plazo_solicitado_letra",
                                valor: this.plazo_letra
                            },
                            {
                                nombre: "nombreSolicitante",
                                valor: this.data_client.nombre
                            },
                            {
                                nombre: "ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                            },
                            {
                                nombre: "ap_materno_cliente",
                                valor: this.data_client.aMaterno
                            }
                        ]
                    }
                }
            }
    
            if (code === "DXNARC") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos: [
                            {
                                nombre: "nombreSolicitante",
                                valor: this.data_client.nombre
                            },
                            {
                                nombre: "ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                            },
                            {
                                nombre: "ap_materno_cliente",
                                valor: this.data_client.aMaterno
                            },
                            {
                                nombre: "rfc",
                                valor: this.data_client.rfc
                            },
                            {
                                nombre: "direccion",
                                valor: this.address.calle + ' ' + this.address.numExt
                            },
                            {
                                nombre: "colonia",
                                valor: this.address.colonia
                            },
                            {
                                nombre: "del_municipio",
                                valor: this.address.delegacion
                            },
                            {
                                nombre: "estado",
                                valor: this.estado
                            },
                            {
                                nombre: "cp",
                                valor: this.address.cp
                            },
                            {
                                nombre: "telefono",
                                valor: this.telefono
                            },
                            {
                                nombre: "celular",
                                valor: this.telefono
                            },
                            {
                                nombre: "lugar_autorizacion",
                                valor: "México"
                            },
                            {
                                nombre: "dia_autorizacion",
                                valor: this.dia
                            },
                            {
                                nombre: "diag_dia_mes",
                                valor: "/"
                            },
                            {
                                nombre: "mes_autorizacion",
                                valor: this.mes
                            },
                            {
                                nombre: "diag_mes_anio",
                                valor: "/"
                            },
                            {
                                nombre: "anio_autorizacion",
                                valor: this.anio
                            },
                            {
                                nombre: "nombre_agente",
                                valor: this.agent_name
                            }
                        ]
                    }
                }
            }
    
            if (code === "DXNFSOL") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract:"DXNFSOL",
                        campos:[
                                    {
                                nombre:"folio",
                                valor: this.credito.folio
                                },{
                                nombre:"lugar_expedicion",
                                valor:"México"
                                },{
                                nombre:"dia_fecha",
                                valor: this.dia
                                },{
                                nombre:"mes_fecha",
                                valor: this.mes
                                },{
                                nombre:"anio_fecha",
                                valor: this.anio
                                },{
                                nombre:"clave_ejecutivo",
                                valor: this.claveEjecutivo
                                },{
                                nombre:"clave_descuento",
                                valor: this.agreement.discountKey
                                },{
                                nombre:"credinomina",
                                valor: "X"
                                },{
                                nombre:"credinomina_plus",
                                valor:""
                                },{
                                nombre:"crediresuelve",
                                valor:""
                                },{
                                nombre:"credimejora",
                                valor:""
                                },{
                                nombre:"monto_sol",
                                valor: this.credito.ammount
                                },{
                                nombre:"monto_sol_letra",
                                valor: this.numbers.NumeroALetras(this.credito.ammount)
                                },{
                                nombre:"plazo_solicitado",
                                valor: this.credito.terms
                                },{
                                nombre:"frec_semanal",
                                valor: this.semanal
                                },{
                                nombre:"frec_catorncenal",
                                valor: this.catorcenal
                                },{
                                nombre:"frec_quincenal",
                                valor: this.quincenal
                                },{
                                nombre:"frec_mensual",
                                valor: this.mensual
                                },{
                                nombre:"t_int_anual",
                                valor: this.agreement.annualInterestRate
                                },{
                                nombre:"importe_pago",
                                valor: this.credito.discount
                                },{
                                nombre:"importe_pago_letra",
                                valor: this.numbers.NumeroALetras(this.credito.discount)
                                },{
                                nombre:"ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                                },{
                                nombre:"ap_materno_cliente",
                                valor: this.data_client.aMaterno
                                },{
                                nombre:"nombreSolicitante",
                                valor: this.data_client.nombre
                                },{
                                nombre:"genero_masulino",
                                valor: this.masculino
                                },{
                                nombre:"genero_femenino",
                                valor: this.femenino
                                },{
                                nombre:"curp",
                                valor: this.data_client.curp
                                },{
                                nombre:"rfc",
                                valor: this.data_client.rfc
                                },{
                                nombre:"telefono",
                                valor: this.telefono
                                },{
                                nombre:"celular",
                                valor: this.telefono
                                },{
                                nombre:"email",
                                valor: this.email
                                },{
                                nombre:"lugar_nacimiento",
                                valor: this.ciudad
                                },{
                                nombre:"dia_nacimiento",
                                valor: this.diaNac
                                },{
                                nombre:"mes_nacimiento",
                                valor: this.mesNac
                                },{
                                nombre:"anio_nacimiento",
                                valor: this.anioNac
                                },{
                                nombre:"nacionalidad",
                                valor: "Méxicana"
                                },{
                                nombre:"casado",
                                valor:""
                                },{
                                nombre:"soltero",
                                valor:""
                                },{
                                nombre:"viudo",
                                valor:""
                                },{
                                nombre:"union_libre",
                                valor:""
                                },{
                                nombre:"vivienda_propia",
                                valor:""
                                },{
                                nombre:"vivienda_hipotecada",
                                valor:""
                                },{
                                nombre:"vivienda_familiar",
                                valor:""
                                },{
                                nombre:"vivienda_rentada",
                                valor:""
                                },{
                                nombre:"calle_numero",
                                valor: this.address.calle + ' ' + this.address.numExt
                                },{
                                nombre:"colonia",
                                valor: this.address.colonia
                                },{
                                nombre:"del_municipio",
                                valor: this.address.delegacion
                                },{
                                nombre:"cp",
                                valor: this.address.cp
                                },{
                                nombre:"ciudad",
                                valor: this.address.ciudad
                                },{
                                nombre:"estado",
                                valor: this.address.estado
                                },{
                                nombre:"pais",
                                valor: "México"
                                },{
                                nombre:"anios_domicilio",
                                valor:""
                                },{
                                nombre:"meses_domicilio",
                                valor:""
                                },{
                                nombre:"entre_calles",
                                valor:""
                                },{
                                nombre:"empresa",
                                valor:""
                                },{
                                nombre:"unidad",
                                valor:""
                                },{
                                nombre:"dia_ingreso",
                                valor: this.diaLab
                                },{
                                nombre:"mes_ingreso",
                                valor: this.mesLab
                                },{
                                nombre:"anio_ingreso",
                                valor: this.anioLab
                                },{
                                nombre:"antiguedad",
                                valor: this.antiguedad
                                },{
                                nombre:"area",
                                valor:""
                                },{
                                nombre:"profesion",
                                valor:""
                                },{
                                nombre:"puesto",
                                valor:""
                                },{
                                nombre:"horario",
                                valor:""
                                },{
                                nombre:"tel_trabajo",
                                valor:""
                                },{
                                nombre:"ext_trabajo",
                                valor:""
                                },{
                                nombre:"ingreso_neto",
                                valor: this.credito.net_income
                                },{
                                nombre:"calle_num_trabajo",
                                valor: this.workAddress.calle + ' ' + this.workAddress.numExt
                                },{
                                nombre:"colonia_trabajo",
                                valor: this.workAddress.colonia
                                },{
                                nombre:"del_mun_trabajo",
                                valor: this.workAddress.delegacion
                                },{
                                nombre:"cp_trabajo",
                                valor: this.workAddress.cp
                                },{
                                nombre:"ciudad_trabajo",
                                valor: this.workAddress.ciudad
                                },{
                                nombre:"estado_trabajo",
                                valor: this.workAddress.estado
                                },{
                                nombre:"pais_trabajo",
                                valor: "México"
                                },{
                                nombre:"entre_calles_trabajo",
                                valor:""
                                },{
                                nombre:"ref_lab1_nombre",
                                valor: this.referencias.l_nombre + ' ' + this.referencias.l_apellidos
                                },{
                                nombre:"ref_lab1_relacion",
                                valor: this.referencias.l_relacion
                                },{
                                nombre:"ref_lab1_telefono",
                                valor: this.referencias.l_telefono_fijo
                                },{
                                nombre:"ref_lab1_celular",
                                valor: this.referencias.l_telefono_celular
                                },{
                                nombre:"ref_lab2_nombre",
                                valor:""
                                },{
                                nombre:"ref_lab2_relacion",
                                valor:""
                                },{
                                nombre:"ref_lab2_telefono",
                                valor:""
                                },{
                                nombre:"ref_lab2_celular",
                                valor:""
                                },{
                                nombre:"ref_per1_nombre",
                                valor: this.referencias.p_nombre + ' ' + this.referencias.p_apellidos
                                },{
                                nombre:"ref_per1_relacion",
                                valor: this.referencias.p_relacion
                                },{
                                nombre:"ref_per1_telefono",
                                valor: this.referencias.p_telefono_fijo
                                },{
                                nombre:"ref_per1_celular",
                                valor: this.referencias.p_telefono_celular
                                },{
                                nombre:"ref_per2_nombre",
                                valor:""
                                },{
                                nombre:"ref_per2_relacion",
                                valor:""
                                },{
                                nombre:"ref_per2_telefono",
                                valor:""
                                },{
                                nombre:"ref_per2_celular",
                                valor:""
                                },{
                                nombre:"banco",
                                valor: this.banco
                                },{
                                nombre:"cuenta_clabe",
                                valor: this.clabe
                                },{
                                nombre:"frec_semanal",
                                valor: this.semanal
                                },{
                                nombre:"frec_catorncenal",
                                valor: this.catorcenal
                                },{
                                nombre:"frec_quincenal",
                                valor: this.quincenal
                                },{
                                nombre:"frec_mensual",
                                valor: this.mensual
                                },{
                                nombre:"celular",
                                valor: this.telefono
                                },{
                                nombre:"importe_pago",
                                valor: this.credito.discount
                                },{
                                nombre:"importe_pago_letra",
                                valor: this.numbers.NumeroALetras(this.credito.discount)
                                },{
                                nombre:"fiel",
                                valor:""
                                },{
                                nombre:"relacion_politica_si",
                                valor: this.politicoSi
                                },{
                                nombre:"relacion_politica_no",
                                valor: this.politicoNo
                                },{
                                nombre:"cargo",
                                valor: this.kyc.exposedCharge
                                },{
                                nombre:"persona_expuesta",
                                valor: this.kyc.exposedName
                                },{
                                nombre:"inmuebles",
                                valor: this.kyc.inmuebles
                                },{
                                nombre:"valor_inmuebles",
                                valor: this.kyc.inValue
                                },{
                                nombre:"nomina",
                                valor:""
                                },{
                                nombre:"otros_ingresos_si",
                                valor: this.ingresosSi
                                },{
                                nombre:"otros_ingresos_no",
                                valor: this.ingresosNo
                                },{
                                nombre:"especificar",
                                valor: this.kyc.adEsp
                                },{
                                nombre:"neto_mensual_otros",
                                valor: this.kyc.adNeto
                                },{
                                nombre:"con_auto_si",
                                valor: this.autoSi
                                },{
                                nombre:"con_auto_no",
                                valor: this.autoNo
                                },{
                                nombre:"marca_auto",
                                valor: this.kyc.marca
                                },{
                                nombre:"modelo_auto",
                                valor: this.kyc.modelo
                                },{
                                nombre:"anio_auto",
                                valor: this.kyc.ano
                                },{
                                nombre:"valor_auto",
                                valor: this.kyc.valor
                                },{
                                nombre:"destino_emergencia",
                                valor:""
                                },{
                                nombre:"destino_consumo",
                                valor:""
                                },{
                                nombre:"destino_otros_creditos",
                                valor:""
                                },{
                                nombre:"destino_capital",
                                valor:""
                                },{
                                nombre:"cuenta_propia",
                                valor:""
                                },{
                                nombre:"cuenta_tercero",
                                valor:""
                                },{
                                nombre:"nombre_completo_tercero",
                                valor: ""
                                },{
                                nombre:"bajo",
                                valor:""
                                },{
                                nombre:"alto",
                                valor:""
                                },{
                                nombre:"nombre_asesor",
                                valor:""
                                },{
                                nombre:"firma_asesor",
                                valor:""
                                }
                        ]
                    }
                }
            }
    
            if (code === "DXNFPAG") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos: [
                            {
                                nombre: "importe_credito",
                                valor: this.credito.ammount
                            },
                            {
                                nombre: "ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                            },
                            {
                                nombre: "ap_materno_cliente",
                                valor: this.data_client.aMaterno
                            },
                            {
                                nombre: "nombreSolicitante",
                                valor: this.data_client.nombre
                            },
                            {
                                nombre: "plazos",
                                valor: this.credito.terms
                            },
                            {
                                nombre: "frec_semanal",
                                valor: this.semanal
                            },
                            {
                                nombre: "frec_catorcenal",
                                valor: this.catorcenal
                            },
                            {
                                nombre: "frec_quincenal",
                                valor: this.quincenal
                            },
                            {
                                nombre: "frec_mensual",
                                valor: this.mensual
                            },
                            {
                                nombre: "importe",
                                valor: this.credito.ammount
                            },
                            {
                                nombre: "importe_letra",
                                valor: this.numbers.NumeroALetras(this.credito.ammount)
                            }
                        ]
                    }
                }
            }
    
            console.log('JsonDoc: ', JSON.stringify(jsonDoc));
            return jsonDoc;
        } else {
            if (code === "DXNC") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos:[
                            {
                            nombre:"nombre_producto",
                            valor: this.credito.product_name
                            },{
                            nombre:"tipo_credito",
                            valor: this.credito.agreement_name
                            },{
                            nombre:"cat",
                            valor: this.agreement.cat
                            },{
                            nombre:"ti_anual",
                            valor: this.agreement.annualInterestRate
                            },{
                            nombre:"monto_linea",
                            valor: this.credito.ammount
                            },{
                            nombre:"monto_total",
                            valor: this.credito.total_pay
                            },{
                            nombre:"plazo_credito",
                            valor: this.credito.terms
                            },{
                            nombre:"fecha_corte",
                            valor:""
                            },{
                            nombre:"fecha_limite_pago",
                            valor:""
                            },{
                            nombre:"meses",
                            valor: this.credito.terms
                            },{
                            nombre:"dia_fecha",
                            valor: this.dia
                            },{
                            nombre:"mes_fecha",
                            valor: this.mes
                            },{
                            nombre:"anio_fecha",
                            valor: this.anio
                            },{
                            nombre:"nombreSolicitante",
                            valor: this.data_client.nombre
                            },{
                            nombre:"ap_paterno_cliente",
                            valor: this.data_client.aPaterno
                            },{
                            nombre:"ap_materno_cliente",
                            valor: this.data_client.aMaterno
                            },{
                            nombre:"RFC",
                            valor: this.data_client.rfc
                            },{
                            nombre:"email",
                            valor: this.email
                            },{
                            nombre:"firmaBio",
                            valor: firmaBio
                            },{
                            nombre: "firmaAuth",
                            valor: firmaAuth    
                            },{
                            nombre:"aceptContratoSi",
                            valor: this.aceptaSi
                            },{
                            nombre:"aceptContratoNo",
                            valor: this.aceptaNo
                            }
                        ]
                    }
                }
            }
    
            if (code === "DXNCARINS"){
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos: [
                            {
                                nombre: "lugar_expedicion",
                                valor: "México"
                            },
                            {
                                nombre: "rightindex",
                                valor: firmaBio
                            },
                            {
                                nombre: "dia_fecha",
                                valor: this.dia
                            },
                            {
                                nombre: "diag_dia_mes",
                                valor: "/"
                            },
                            {
                                nombre: "mes_fecha",
                                valor: this.mes
                            },
                            {
                                nombre: "diag_mes_anio",
                                valor: "/"
                            },
                            {
                                nombre: "anio_fecha",
                                valor: this.anio
                            },
                            {
                                nombre: "no_contrato",
                                valor: this.credito.folio
                            },
                            {
                                nombre: "nombreSolicitante",
                                valor: this.data_client.nombre
                            },
                            {
                                nombre: "ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                            },
                            {
                                nombre: "ap_materno_cliente",
                                valor: this.data_client.aMaterno
                            },
                            {
                                nombre: "matricula_nss",
                                valor: "1231324"
                            },
                            {
                                nombre: "delegacion",
                                valor: this.address.delegacion
                            },
                            {
                                nombre: "clave",
                                valor: "32123132"
                            },
                            {
                                nombre: "trabajador",
                                valor: "X"
                            },
                            {
                                nombre: "jubilado_pensionado",
                                valor: "X"
                            },
                            {
                                nombre: "pensionado",
                                valor: "X"
                            },
                            {
                                nombre: "clave_00",
                                valor: "X"
                            },
                            {
                                nombre: "clave_01",
                                valor: "X"
                            },
                            {
                                nombre: "clave_04",
                                valor: "X"
                            },
                            {
                                nombre: "clave_10",
                                valor: "X"
                            },
                            {
                                nombre: "clave_11",
                                valor: "X"
                            },
                            {
                                nombre: "ti_mensual",
                                valor: this.agreement.monthlyInterestRate
                            },
                            {
                                nombre: "cat",
                                valor: this.agreement.cat
                            },
                            {
                                nombre: "monto_sol",
                                valor: this.credito.ammount
                            },
                            {
                                nombre: "descuento",
                                valor: this.credito.discount
                            },
                            {
                                nombre: "total_descuentos",
                                valor: this.credito.terms
                            },
                            {
                                nombre: "frec_quincenal",
                                valor: this.quincenal
                            },
                            {
                                nombre: "frec_mensual",
                                valor: this.mensual
                            },
                            {
                                nombre: "total_pago_intereses",
                                valor: this.credito.total_pay - this.credito.ammount
                            },
                            {
                                nombre: "cuenta_clabe",
                                valor: this.clabe
                            },
                            {
                                nombre: "banco",
                                valor: this.banco
                            },
                            {
                            nombre:"firmaBio",
                            valor: firmaBio
                            },
                            {
                            nombre: "firmaAuth",
                            valor: firmaAuth    
                            }
                        ]
                    }
                }
            }
    
            if (code === "DXNFAUT2") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos: [
                            {
                                nombre: "lugar_expedicion",
                                valor: "México"
                            },
                            {
                                nombre: "dia_fecha",
                                valor: this.dia
                            },
                            {
                                nombre: "mes_fecha",
                                valor: this.mes
                            },
                            {
                                nombre: "anio_fecha",
                                valor: this.anio
                            },
                            {
                                nombre: "retenedor",
                                valor: ""
                            },
                            {
                                nombre: "importe_pago",
                                valor: this.credito.discount
                            },
                            {
                                nombre: "importe_pago_letra",
                                valor: this.numbers.NumeroALetras(this.credito.discount)
                            },
                            {
                                nombre: "plazo_solicitado",
                                valor: this.credito.terms
                            },
                            {
                                nombre: "frec_semanal",
                                valor: this.semanal
                            },
                            {
                                nombre: "frec_catorcenal",
                                valor: this.catorcenal
                            },
                            {
                                nombre: "frec_quincenal",
                                valor: this.quincenal
                            },
                            {
                                nombre: "frec_mensual",
                                valor: this.mensual
                            },
                            {
                                nombre: "plazo_solicitado_letra",
                                valor: this.plazo_letra
                            },
                            {
                                nombre: "nombreSolicitante",
                                valor: this.data_client.nombre
                            },
                            {
                                nombre: "ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                            },
                            {
                                nombre: "ap_materno_cliente",
                                valor: this.data_client.aMaterno
                            },
                            {
                            nombre:"firmaBio",
                            valor: firmaBio
                            },
                            {
                            nombre: "firmaAuth",
                            valor: firmaAuth    
                            }
                        ]
                    }
                }
            }
    
            if (code === "DXNARC") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos: [
                            {
                                nombre: "nombreSolicitante",
                                valor: this.data_client.nombre
                            },
                            {
                                nombre: "ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                            },
                            {
                                nombre: "ap_materno_cliente",
                                valor: this.data_client.aMaterno
                            },
                            {
                                nombre: "rfc",
                                valor: this.data_client.rfc
                            },
                            {
                                nombre: "direccion",
                                valor: this.address.calle + ' ' + this.address.numExt
                            },
                            {
                                nombre: "colonia",
                                valor: this.address.colonia
                            },
                            {
                                nombre: "del_municipio",
                                valor: this.address.delegacion
                            },
                            {
                                nombre: "estado",
                                valor: this.estado
                            },
                            {
                                nombre: "cp",
                                valor: this.address.cp
                            },
                            {
                                nombre: "telefono",
                                valor: this.telefono
                            },
                            {
                                nombre: "celular",
                                valor: this.telefono
                            },
                            {
                                nombre: "lugar_autorizacion",
                                valor: "México"
                            },
                            {
                                nombre: "dia_autorizacion",
                                valor: this.dia
                            },
                            {
                                nombre: "diag_dia_mes",
                                valor: "/"
                            },
                            {
                                nombre: "mes_autorizacion",
                                valor: this.mes
                            },
                            {
                                nombre: "diag_mes_anio",
                                valor: "/"
                            },
                            {
                                nombre: "anio_autorizacion",
                                valor: this.anio
                            },
                            {
                                nombre: "nombre_agente",
                                valor: this.agent_name
                            },
                            {
                            nombre:"firmaBio",
                            valor: firmaBio
                            },
                            {
                            nombre: "firmaAuth",
                            valor: firmaAuth    
                            }
                        ]
                    }
                }
            }
    
            if (code === "DXNFSOL") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract:"DXNFSOL",
                        campos:[
                                    {
                                nombre:"folio",
                                valor: this.credito.folio
                                },{
                                nombre:"lugar_expedicion",
                                valor:"México"
                                },{
                                nombre:"dia_fecha",
                                valor: this.dia
                                },{
                                nombre:"mes_fecha",
                                valor: this.mes
                                },{
                                nombre:"anio_fecha",
                                valor: this.anio
                                },{
                                nombre:"clave_ejecutivo",
                                valor: this.claveEjecutivo
                                },{
                                nombre:"clave_descuento",
                                valor: this.agreement.discountKey
                                },{
                                nombre:"credinomina",
                                valor: "X"
                                },{
                                nombre:"credinomina_plus",
                                valor:""
                                },{
                                nombre:"crediresuelve",
                                valor:""
                                },{
                                nombre:"credimejora",
                                valor:""
                                },{
                                nombre:"monto_sol",
                                valor: this.credito.ammount
                                },{
                                nombre:"monto_sol_letra",
                                valor: this.numbers.NumeroALetras(this.credito.ammount)
                                },{
                                nombre:"plazo_solicitado",
                                valor: this.credito.terms
                                },{
                                nombre:"frec_semanal",
                                valor: this.semanal
                                },{
                                nombre:"frec_catorncenal",
                                valor: this.catorcenal
                                },{
                                nombre:"frec_quincenal",
                                valor: this.quincenal
                                },{
                                nombre:"frec_mensual",
                                valor: this.mensual
                                },{
                                nombre:"t_int_anual",
                                valor: this.agreement.annualInterestRate
                                },{
                                nombre:"importe_pago",
                                valor: this.credito.discount
                                },{
                                nombre:"importe_pago_letra",
                                valor: this.numbers.NumeroALetras(this.credito.discount)
                                },{
                                nombre:"ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                                },{
                                nombre:"ap_materno_cliente",
                                valor: this.data_client.aMaterno
                                },{
                                nombre:"nombreSolicitante",
                                valor: this.data_client.nombre
                                },{
                                nombre:"genero_masulino",
                                valor: this.masculino
                                },{
                                nombre:"genero_femenino",
                                valor: this.femenino
                                },{
                                nombre:"curp",
                                valor: this.data_client.curp
                                },{
                                nombre:"rfc",
                                valor: this.data_client.rfc
                                },{
                                nombre:"telefono",
                                valor: this.telefono
                                },{
                                nombre:"celular",
                                valor: this.telefono
                                },{
                                nombre:"email",
                                valor: this.email
                                },{
                                nombre:"lugar_nacimiento",
                                valor: this.ciudad
                                },{
                                nombre:"dia_nacimiento",
                                valor: this.diaNac
                                },{
                                nombre:"mes_nacimiento",
                                valor: this.mesNac
                                },{
                                nombre:"anio_nacimiento",
                                valor: this.anioNac
                                },{
                                nombre:"nacionalidad",
                                valor: "Méxicana"
                                },{
                                nombre:"casado",
                                valor:""
                                },{
                                nombre:"soltero",
                                valor:""
                                },{
                                nombre:"viudo",
                                valor:""
                                },{
                                nombre:"union_libre",
                                valor:""
                                },{
                                nombre:"vivienda_propia",
                                valor:""
                                },{
                                nombre:"vivienda_hipotecada",
                                valor:""
                                },{
                                nombre:"vivienda_familiar",
                                valor:""
                                },{
                                nombre:"vivienda_rentada",
                                valor:""
                                },{
                                nombre:"calle_numero",
                                valor: this.address.calle + ' ' + this.address.numExt
                                },{
                                nombre:"colonia",
                                valor: this.address.colonia
                                },{
                                nombre:"del_municipio",
                                valor: this.address.delegacion
                                },{
                                nombre:"cp",
                                valor: this.address.cp
                                },{
                                nombre:"ciudad",
                                valor: this.address.ciudad
                                },{
                                nombre:"estado",
                                valor: this.address.estado
                                },{
                                nombre:"pais",
                                valor: "México"
                                },{
                                nombre:"anios_domicilio",
                                valor:""
                                },{
                                nombre:"meses_domicilio",
                                valor:""
                                },{
                                nombre:"entre_calles",
                                valor:""
                                },{
                                nombre:"empresa",
                                valor:""
                                },{
                                nombre:"unidad",
                                valor:""
                                },{
                                nombre:"dia_ingreso",
                                valor: this.diaLab
                                },{
                                nombre:"mes_ingreso",
                                valor: this.mesLab
                                },{
                                nombre:"anio_ingreso",
                                valor: this.anioLab
                                },{
                                nombre:"antiguedad",
                                valor: this.antiguedad
                                },{
                                nombre:"area",
                                valor:""
                                },{
                                nombre:"profesion",
                                valor:""
                                },{
                                nombre:"puesto",
                                valor:""
                                },{
                                nombre:"horario",
                                valor:""
                                },{
                                nombre:"tel_trabajo",
                                valor:""
                                },{
                                nombre:"ext_trabajo",
                                valor:""
                                },{
                                nombre:"ingreso_neto",
                                valor: this.credito.net_income
                                },{
                                nombre:"calle_num_trabajo",
                                valor: this.workAddress.calle + ' ' + this.workAddress.numExt
                                },{
                                nombre:"colonia_trabajo",
                                valor: this.workAddress.colonia
                                },{
                                nombre:"del_mun_trabajo",
                                valor: this.workAddress.delegacion
                                },{
                                nombre:"cp_trabajo",
                                valor: this.workAddress.cp
                                },{
                                nombre:"ciudad_trabajo",
                                valor: this.workAddress.ciudad
                                },{
                                nombre:"estado_trabajo",
                                valor: this.workAddress.estado
                                },{
                                nombre:"pais_trabajo",
                                valor: "México"
                                },{
                                nombre:"entre_calles_trabajo",
                                valor:""
                                },{
                                nombre:"ref_lab1_nombre",
                                valor: this.referencias.l_nombre + ' ' + this.referencias.l_apellidos
                                },{
                                nombre:"ref_lab1_relacion",
                                valor: this.referencias.l_relacion
                                },{
                                nombre:"ref_lab1_telefono",
                                valor: this.referencias.l_telefono_fijo
                                },{
                                nombre:"ref_lab1_celular",
                                valor: this.referencias.l_telefono_celular
                                },{
                                nombre:"ref_lab2_nombre",
                                valor:""
                                },{
                                nombre:"ref_lab2_relacion",
                                valor:""
                                },{
                                nombre:"ref_lab2_telefono",
                                valor:""
                                },{
                                nombre:"ref_lab2_celular",
                                valor:""
                                },{
                                nombre:"ref_per1_nombre",
                                valor: this.referencias.p_nombre + ' ' + this.referencias.p_apellidos
                                },{
                                nombre:"ref_per1_relacion",
                                valor: this.referencias.p_relacion
                                },{
                                nombre:"ref_per1_telefono",
                                valor: this.referencias.p_telefono_fijo
                                },{
                                nombre:"ref_per1_celular",
                                valor: this.referencias.p_telefono_celular
                                },{
                                nombre:"ref_per2_nombre",
                                valor:""
                                },{
                                nombre:"ref_per2_relacion",
                                valor:""
                                },{
                                nombre:"ref_per2_telefono",
                                valor:""
                                },{
                                nombre:"ref_per2_celular",
                                valor:""
                                },{
                                nombre:"banco",
                                valor: this.banco
                                },{
                                nombre:"cuenta_clabe",
                                valor: this.clabe
                                },{
                                nombre:"frec_semanal",
                                valor: this.semanal
                                },{
                                nombre:"frec_catorncenal",
                                valor: this.catorcenal
                                },{
                                nombre:"frec_quincenal",
                                valor: this.quincenal
                                },{
                                nombre:"frec_mensual",
                                valor: this.mensual
                                },{
                                nombre:"celular",
                                valor: this.telefono
                                },{
                                nombre:"firmaBio",
                                valor: firmaBio
                                },{
                                nombre: "firmaAuth",
                                valor: firmaAuth    
                                },{
                                nombre:"importe_pago",
                                valor: this.credito.discount
                                },{
                                nombre:"importe_pago_letra",
                                valor: this.numbers.NumeroALetras(this.credito.discount)
                                },{
                                nombre:"fiel",
                                valor:""
                                },{
                                nombre:"relacion_politica_si",
                                valor: this.politicoSi
                                },{
                                nombre:"relacion_politica_no",
                                valor: this.politicoNo
                                },{
                                nombre:"cargo",
                                valor: this.kyc.exposedCharge
                                },{
                                nombre:"persona_expuesta",
                                valor: this.kyc.exposedName
                                },{
                                nombre:"inmuebles",
                                valor: this.kyc.inmuebles
                                },{
                                nombre:"valor_inmuebles",
                                valor: this.kyc.inValue
                                },{
                                nombre:"nomina",
                                valor:""
                                },{
                                nombre:"otros_ingresos_si",
                                valor: this.ingresosSi
                                },{
                                nombre:"otros_ingresos_no",
                                valor: this.ingresosNo
                                },{
                                nombre:"especificar",
                                valor: this.kyc.adEsp
                                },{
                                nombre:"neto_mensual_otros",
                                valor: this.kyc.adNeto
                                },{
                                nombre:"con_auto_si",
                                valor: this.autoSi
                                },{
                                nombre:"con_auto_no",
                                valor: this.autoNo
                                },{
                                nombre:"marca_auto",
                                valor: this.kyc.marca
                                },{
                                nombre:"modelo_auto",
                                valor: this.kyc.modelo
                                },{
                                nombre:"anio_auto",
                                valor: this.kyc.ano
                                },{
                                nombre:"valor_auto",
                                valor: this.kyc.valor
                                },{
                                nombre:"destino_emergencia",
                                valor:""
                                },{
                                nombre:"destino_consumo",
                                valor:""
                                },{
                                nombre:"destino_otros_creditos",
                                valor:""
                                },{
                                nombre:"destino_capital",
                                valor:""
                                },{
                                nombre:"cuenta_propia",
                                valor:""
                                },{
                                nombre:"cuenta_tercero",
                                valor:""
                                },{
                                nombre:"nombre_completo_tercero",
                                valor: ""
                                },{
                                nombre:"bajo",
                                valor:""
                                },{
                                nombre:"alto",
                                valor:""
                                },{
                                nombre:"nombre_asesor",
                                valor:""
                                },{
                                nombre:"firma_asesor",
                                valor:""
                                }
                        ]
                    }
                }
            }
    
            if (code === "DXNFPAG") {
                jsonDoc = {
                    operationId: this.operationId,
                    metadata: {
                        deviceInfo: 'Android',
                        userId: this.agent.user
                    },
                    data: {
                        documentType: docType,
                        codeContract: code,
                        campos: [
                            {
                                nombre: "importe_credito",
                                valor: this.credito.ammount
                            },
                            {
                                nombre: "ap_paterno_cliente",
                                valor: this.data_client.aPaterno
                            },
                            {
                                nombre: "ap_materno_cliente",
                                valor: this.data_client.aMaterno
                            },
                            {
                                nombre: "nombreSolicitante",
                                valor: this.data_client.nombre
                            },
                            {
                                nombre: "plazos",
                                valor: this.credito.terms
                            },
                            {
                                nombre: "frec_semanal",
                                valor: this.semanal
                            },
                            {
                                nombre: "frec_catorcenal",
                                valor: this.catorcenal
                            },
                            {
                                nombre: "frec_quincenal",
                                valor: this.quincenal
                            },
                            {
                                nombre: "frec_mensual",
                                valor: this.mensual
                            },
                            {
                                nombre: "importe",
                                valor: this.credito.ammount
                            },
                            {
                                nombre: "importe_letra",
                                valor: this.numbers.NumeroALetras(this.credito.ammount)
                            },
                            {
                            nombre:"firmaBio",
                            valor: firmaBio
                            },
                            {
                            nombre: "firmaAuth",
                            valor: firmaAuth    
                            }
                        ]
                    }
                }
            }
    
            console.log('JsonDoc: ', JSON.stringify(jsonDoc));
            return jsonDoc;
        }

    }

    updatePerson() {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
        });

        return this.http.post(environment.servicesURL + environment.updatePerson, JSON.stringify(this.genJsonUpdPerson()), {headers});
    }

    genJsonUpdPerson() {
        const request = {
            operationId: this.operationId,
            metadata: {
                deviceinfo: this.device.platform + ' ' + this.device.version + ' - ' + this.device.model + ' - ' +this.device.manufacturer,
                userId: this.agent.user
            },
            data: {
                person: {
                    sex: this.sex,
                    birthDate: this.anioNac + '-' + this.mesNac + '-' + this.diaNac,
                    email: this.email,
                    phone: {
                        number: this.telefono
                    }
                }
            },
            action: "update-person"
        };
        console.log('Datos Update Person', JSON.stringify(request));
        return request;
    }

}