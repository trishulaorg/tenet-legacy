type Props = {
    title: string
}

export default function NotificationTitle(props: Props) {
    const { title } = props
    return (
        <>
            <div className="mb-2 font-semibold">
                { title }
            </div>
        </>
    )
}