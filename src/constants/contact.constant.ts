export type AdminContactEntry = {
    label: string
    phone: string
}

export type AdminContactNumber = AdminContactEntry & {
    display: string
    whatsapp: string
}

export const defaultAdminContacts: AdminContactEntry[] = [
    {
        label: 'Admin 1',
        phone: '+584244342107',
    },
    {
        label: 'Admin 2',
        phone: '+584144376880',
    },
]

export const normalizePhone = (phone: string) => phone.replace(/[^+\d]/g, '')

export const buildWhatsAppLink = (phone: string) =>
    `https://wa.me/${normalizePhone(phone).replace(/^\+/, '')}`

export const formatPhoneDisplay = (phone: string) => phone

export const toAdminContactNumber = (
    entry: AdminContactEntry,
): AdminContactNumber => ({
    ...entry,
    phone: normalizePhone(entry.phone),
    display: formatPhoneDisplay(entry.phone),
    whatsapp: buildWhatsAppLink(entry.phone),
})

export const getDefaultAdminContactNumbers = () =>
    defaultAdminContacts.map(toAdminContactNumber)
