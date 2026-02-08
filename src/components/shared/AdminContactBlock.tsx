import Button from '@/components/ui/Button'
import useAdminContacts from '@/hooks/useAdminContacts'
import { PiPhoneDuotone, PiWhatsappLogoDuotone } from 'react-icons/pi'

type AdminContactBlockProps = {
    title?: string
    description?: string
    className?: string
}

const AdminContactBlock = ({
    title = 'Contact Admin Team',
    description = 'Reach our admins directly via phone or WhatsApp.',
    className = '',
}: AdminContactBlockProps) => {
    const { contactNumbers, loading } = useAdminContacts()

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm ${className}`}>
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </div>
            <div className="space-y-3">
                {loading && contactNumbers.length === 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Loading contact numbers...
                    </div>
                )}
                {contactNumbers.map((contact) => (
                    <div
                        key={contact.phone}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-3"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                <PiPhoneDuotone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {contact.label}
                                </p>
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
                                >
                                    {contact.display}
                                </a>
                            </div>
                        </div>
                        <a
                            href={contact.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                variant="solid"
                                size="sm"
                                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                                icon={<PiWhatsappLogoDuotone />}
                            >
                                WhatsApp
                            </Button>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminContactBlock
