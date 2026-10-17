import { SvgIcon, SvgIconProps } from '@mui/material'
import Api from '@mui/icons-material/Api'
import AccountTreeOutlined from '@mui/icons-material/AccountTreeOutlined'
import AllInclusive from '@mui/icons-material/AllInclusive'
import CloudOutlined from '@mui/icons-material/CloudOutlined'
import ExtensionOutlined from '@mui/icons-material/ExtensionOutlined'
import HubOutlined from '@mui/icons-material/HubOutlined'
import ManageSearch from '@mui/icons-material/ManageSearch'
import SpeedOutlined from '@mui/icons-material/SpeedOutlined'
import StorageOutlined from '@mui/icons-material/StorageOutlined'
import {
    siDocker,
    siExpress,
    siFastapi,
    siFastify,
    siGit,
    siGo,
    siJavascript,
    siJsonwebtokens,
    siLinux,
    siMongodb,
    siNestjs,
    siNextdotjs,
    siNodedotjs,
    siPostgresql,
    siPython,
    siReact,
    siTypescript,
} from 'simple-icons'

// Brand logos (simple-icons, 24x24 single-path SVGs), keyed by skill label
const BRAND_ICON_PATHS: Record<string, string> = {
    Go: siGo.path,
    TypeScript: siTypescript.path,
    JavaScript: siJavascript.path,
    Python: siPython.path,
    'Node.js': siNodedotjs.path,
    Fastify: siFastify.path,
    NestJS: siNestjs.path,
    Express: siExpress.path,
    FastAPI: siFastapi.path,
    'JWT & RBAC': siJsonwebtokens.path,
    PostgreSQL: siPostgresql.path,
    MongoDB: siMongodb.path,
    Docker: siDocker.path,
    Linux: siLinux.path,
    Git: siGit.path,
    React: siReact.path,
    'Next.js': siNextdotjs.path,
}

// Concepts without a brand logo (AWS was dropped from simple-icons)
const CONCEPT_ICONS: Record<string, typeof Api> = {
    SQL: StorageOutlined,
    'REST API design': Api,
    Microservices: HubOutlined,
    'Third-party integrations': ExtensionOutlined,
    'Schema design': AccountTreeOutlined,
    'Query optimization': SpeedOutlined,
    Indexing: ManageSearch,
    AWS: CloudOutlined,
    'CI/CD': AllInclusive,
}

interface IProps extends SvgIconProps {
    skill: string
}

// Renders nothing for a skill with no mapped icon, so new skills still work
export default function SkillIcon({ skill, ...props }: IProps) {
    const brandPath = BRAND_ICON_PATHS[skill]
    if (brandPath) {
        return (
            <SvgIcon {...props}>
                <path d={brandPath} />
            </SvgIcon>
        )
    }

    const ConceptIcon = CONCEPT_ICONS[skill]
    if (ConceptIcon) return <ConceptIcon {...props} />

    return null
}
