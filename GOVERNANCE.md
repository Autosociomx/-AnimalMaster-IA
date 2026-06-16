# Gobernanza Digital — Animal Master IA

## Visión General

Este documento define el modelo de gobernanza digital para el proyecto **Animal Master IA** (`autosociomx/-AnimalMaster-IA`). Establece los roles, procesos de toma de decisiones y políticas que rigen el desarrollo y evolución de esta plataforma.

---

## Roles y Responsabilidades

### Propietario del Proyecto
- Organización: **Autosociomx**
- Responsabilidad final sobre la dirección del producto y su estrategia.
- Aprueba cambios arquitectónicos mayores y decisiones de seguridad críticas.

### Mantenedores
- Revisan y aprueban Pull Requests.
- Gestionan el roadmap y las versiones de lanzamiento.
- Moderan la comunidad y los issues del repositorio.

### Colaboradores
- Contribuyen con código, documentación o contenido.
- Abren issues para reportar errores o proponer mejoras.
- Participan en revisiones de código.

---

## Proceso de Contribución

1. **Forkea** el repositorio o trabaja en una rama de feature.
2. **Abre un issue** antes de iniciar cambios mayores para alinear con los mantenedores.
3. **Crea un Pull Request** siguiendo la plantilla provista.
4. Al menos **un mantenedor** debe aprobar el PR antes de hacer merge.
5. Los cambios a `main` requieren pasar todos los checks de CI/CD.

---

## Gestión de Ramas

| Rama | Propósito |
|------|-----------|
| `main` | Producción estable. Protegida contra push directo. |
| `develop` | Integración de features. Base para releases. |
| `feature/*` | Desarrollo de nuevas funcionalidades. |
| `fix/*` | Correcciones de errores. |
| `claude/*` | Ramas de trabajo asistido por IA. |

---

## Toma de Decisiones

- **Cambios menores** (correcciones, actualizaciones de contenido): aprobación de 1 mantenedor.
- **Cambios mayores** (nueva arquitectura, cambios de dependencias críticas): aprobación de 2 mantenedores y notificación al propietario.
- **Cambios de gobernanza** (este documento): revisión completa del equipo y aprobación del propietario.

---

## Ciclo de Releases

- **Patch** (x.x.N): correcciones de errores — según necesidad.
- **Minor** (x.N.x): nuevas funcionalidades compatibles — mensual.
- **Major** (N.x.x): cambios que rompen compatibilidad — trimestral con aviso previo.

---

## Cumplimiento y Seguridad

- Todos los secretos y credenciales se gestionan mediante **GitHub Secrets**.
- Las dependencias se revisan periódicamente con herramientas de análisis de vulnerabilidades.
- Los reportes de seguridad deben seguir el proceso descrito en [SECURITY.md](./SECURITY.md).
- Se prohíbe el almacenamiento de datos sensibles de usuarios en el repositorio.

---

## Privacidad y Datos

Animal Master IA opera conforme a:
- Las leyes de protección de datos aplicables en México (LFPDPPP).
- Las políticas de privacidad de los servicios de terceros integrados (Google Gemini API).

---

## Actualizaciones a este Documento

Este documento de gobernanza se revisa cada **6 meses** o cuando existan cambios significativos en la organización del proyecto. Las propuestas de cambio se tramitan mediante Pull Request con la etiqueta `governance`.

---

*Última actualización: 2026-06-16 | Autosociomx*
