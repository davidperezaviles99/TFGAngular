'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tfgangular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AlumnoModule.html" data-type="entity-link">AlumnoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AlumnoModule-e413d3b836807b90373e515b79af420d"' : 'data-target="#xs-components-links-module-AlumnoModule-e413d3b836807b90373e515b79af420d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AlumnoModule-e413d3b836807b90373e515b79af420d"' :
                                            'id="xs-components-links-module-AlumnoModule-e413d3b836807b90373e515b79af420d"' }>
                                            <li class="link">
                                                <a href="components/AlumnoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlumnoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AlumnoRoutingModule.html" data-type="entity-link">AlumnoRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-0105fa7e139ba335641f33b80c3097bb"' : 'data-target="#xs-components-links-module-AppModule-0105fa7e139ba335641f33b80c3097bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0105fa7e139ba335641f33b80c3097bb"' :
                                            'id="xs-components-links-module-AppModule-0105fa7e139ba335641f33b80c3097bb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AsignaturaModule.html" data-type="entity-link">AsignaturaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AsignaturaModule-064790ff8dcb5467e1134ad6d8ddea58"' : 'data-target="#xs-components-links-module-AsignaturaModule-064790ff8dcb5467e1134ad6d8ddea58"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AsignaturaModule-064790ff8dcb5467e1134ad6d8ddea58"' :
                                            'id="xs-components-links-module-AsignaturaModule-064790ff8dcb5467e1134ad6d8ddea58"' }>
                                            <li class="link">
                                                <a href="components/AsignaturaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AsignaturaComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AsignaturaRoutingModule.html" data-type="entity-link">AsignaturaRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link">ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-b0813b1aff0416fe7e62e5bb68cd62f7"' : 'data-target="#xs-components-links-module-ComponentsModule-b0813b1aff0416fe7e62e5bb68cd62f7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-b0813b1aff0416fe7e62e5bb68cd62f7"' :
                                            'id="xs-components-links-module-ComponentsModule-b0813b1aff0416fe7e62e5bb68cd62f7"' }>
                                            <li class="link">
                                                <a href="components/AlumnoCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AlumnoCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AsignaturaCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AsignaturaCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CursoCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CursoCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DiarioCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiarioCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvaluacionCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MensajeCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MensajeCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfesorCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfesorCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfesorModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfesorModalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TutorCrudComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TutorCrudComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TutorModalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TutorModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CursoModule.html" data-type="entity-link">CursoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CursoModule-d117bfc4f1aafd045df6d5dd90c8ac86"' : 'data-target="#xs-components-links-module-CursoModule-d117bfc4f1aafd045df6d5dd90c8ac86"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CursoModule-d117bfc4f1aafd045df6d5dd90c8ac86"' :
                                            'id="xs-components-links-module-CursoModule-d117bfc4f1aafd045df6d5dd90c8ac86"' }>
                                            <li class="link">
                                                <a href="components/CursoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CursoComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CursoModule-d117bfc4f1aafd045df6d5dd90c8ac86"' : 'data-target="#xs-pipes-links-module-CursoModule-d117bfc4f1aafd045df6d5dd90c8ac86"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CursoModule-d117bfc4f1aafd045df6d5dd90c8ac86"' :
                                            'id="xs-pipes-links-module-CursoModule-d117bfc4f1aafd045df6d5dd90c8ac86"' }>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CursoRoutingModule.html" data-type="entity-link">CursoRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DiarioModule.html" data-type="entity-link">DiarioModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DiarioModule-1acb0ef6b009936df5a96529b4d50911"' : 'data-target="#xs-components-links-module-DiarioModule-1acb0ef6b009936df5a96529b4d50911"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DiarioModule-1acb0ef6b009936df5a96529b4d50911"' :
                                            'id="xs-components-links-module-DiarioModule-1acb0ef6b009936df5a96529b4d50911"' }>
                                            <li class="link">
                                                <a href="components/DiarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DiarioComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DiarioRoutingModule.html" data-type="entity-link">DiarioRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-00272f9b92a42517c71d3c82c16dcd5a"' : 'data-target="#xs-components-links-module-HomeModule-00272f9b92a42517c71d3c82c16dcd5a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-00272f9b92a42517c71d3c82c16dcd5a"' :
                                            'id="xs-components-links-module-HomeModule-00272f9b92a42517c71d3c82c16dcd5a"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link">LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-fae23f8fc051a7d071ccd4bc30a32f07"' : 'data-target="#xs-components-links-module-LoginModule-fae23f8fc051a7d071ccd4bc30a32f07"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-fae23f8fc051a7d071ccd4bc30a32f07"' :
                                            'id="xs-components-links-module-LoginModule-fae23f8fc051a7d071ccd4bc30a32f07"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginRoutingModule.html" data-type="entity-link">LoginRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MensajeModule.html" data-type="entity-link">MensajeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MensajeModule-a9fdb01c6e985445d8fadc6f5f8dc5aa"' : 'data-target="#xs-components-links-module-MensajeModule-a9fdb01c6e985445d8fadc6f5f8dc5aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MensajeModule-a9fdb01c6e985445d8fadc6f5f8dc5aa"' :
                                            'id="xs-components-links-module-MensajeModule-a9fdb01c6e985445d8fadc6f5f8dc5aa"' }>
                                            <li class="link">
                                                <a href="components/MensajeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MensajeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MensajeRoutingModule.html" data-type="entity-link">MensajeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfesorModule.html" data-type="entity-link">ProfesorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfesorModule-3a3591c4de9146c4ab014951dc6da009"' : 'data-target="#xs-components-links-module-ProfesorModule-3a3591c4de9146c4ab014951dc6da009"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfesorModule-3a3591c4de9146c4ab014951dc6da009"' :
                                            'id="xs-components-links-module-ProfesorModule-3a3591c4de9146c4ab014951dc6da009"' }>
                                            <li class="link">
                                                <a href="components/ProfesorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfesorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfesorRoutingModule.html" data-type="entity-link">ProfesorRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link">ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-5f17f444147fdd188520f27778410a52"' : 'data-target="#xs-components-links-module-ProfileModule-5f17f444147fdd188520f27778410a52"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-5f17f444147fdd188520f27778410a52"' :
                                            'id="xs-components-links-module-ProfileModule-5f17f444147fdd188520f27778410a52"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link">ProfileRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TutorModule.html" data-type="entity-link">TutorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TutorModule-c7db5461a3a308d04625aa74bb4d9b8d"' : 'data-target="#xs-components-links-module-TutorModule-c7db5461a3a308d04625aa74bb4d9b8d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TutorModule-c7db5461a3a308d04625aa74bb4d9b8d"' :
                                            'id="xs-components-links-module-TutorModule-c7db5461a3a308d04625aa74bb4d9b8d"' }>
                                            <li class="link">
                                                <a href="components/TutorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TutorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TutorRoutingModule.html" data-type="entity-link">TutorRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Alumno.html" data-type="entity-link">Alumno</a>
                            </li>
                            <li class="link">
                                <a href="classes/Asignaturas.html" data-type="entity-link">Asignaturas</a>
                            </li>
                            <li class="link">
                                <a href="classes/Curso.html" data-type="entity-link">Curso</a>
                            </li>
                            <li class="link">
                                <a href="classes/Diario.html" data-type="entity-link">Diario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Equipo.html" data-type="entity-link">Equipo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Evaluacion.html" data-type="entity-link">Evaluacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mensaje.html" data-type="entity-link">Mensaje</a>
                            </li>
                            <li class="link">
                                <a href="classes/Profesor.html" data-type="entity-link">Profesor</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tutor.html" data-type="entity-link">Tutor</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DiarioService.html" data-type="entity-link">DiarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EquipoService.html" data-type="entity-link">EquipoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MaterialService.html" data-type="entity-link">MaterialService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MensajeService.html" data-type="entity-link">MensajeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link">UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ProfesorGuard.html" data-type="entity-link">ProfesorGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IAlumno.html" data-type="entity-link">IAlumno</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAsignaturas.html" data-type="entity-link">IAsignaturas</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IConsulta.html" data-type="entity-link">IConsulta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICurso.html" data-type="entity-link">ICurso</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IDiario.html" data-type="entity-link">IDiario</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEquipo.html" data-type="entity-link">IEquipo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEquipoMensaje.html" data-type="entity-link">IEquipoMensaje</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IEvaluacion.html" data-type="entity-link">IEvaluacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILogin.html" data-type="entity-link">ILogin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMensaje.html" data-type="entity-link">IMensaje</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMessage.html" data-type="entity-link">IMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IProfesor.html" data-type="entity-link">IProfesor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITutor.html" data-type="entity-link">ITutor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link">IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});