

type Props = {
    type : string
}

export default function NotificationType(props: Props) {
    const { type } = props
    return (
        <>
            <div className="rounded-full bg-contentbg dark:bg-contentbg-dark p-2">
                <div>
                    {type == "comment" ? "🗨️" : (type == "like" ? "❤️" : "👀")}
                </div>
            </div>
        </>
    )
}