import {
    PiHouseLineDuotone,
    PiWrenchDuotone,
    PiUsersDuotone,
    PiShoppingCartDuotone,
    PiUserCircleDuotone,
    PiGaugeDuotone,
    PiPackageDuotone,
    PiInfoDuotone,
    PiBuildingsDuotone,
    PiPhoneDuotone,
    PiClipboardTextDuotone,
    PiStarDuotone,
} from 'react-icons/pi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <PiHouseLineDuotone />,
    services: <PiWrenchDuotone />,
    workers: <PiUsersDuotone />,
    cart: <PiShoppingCartDuotone />,
    customer: <PiUserCircleDuotone />,
    admin: <PiGaugeDuotone />,
    dashboard: <PiGaugeDuotone />,
    inventory: <PiPackageDuotone />,
    info: <PiInfoDuotone />,
    about: <PiInfoDuotone />,
    contact: <PiPhoneDuotone />,
    enterprise: <PiBuildingsDuotone />,
    quote: <PiClipboardTextDuotone />,
    feedback: <PiStarDuotone />,
}

export default navigationIcon
