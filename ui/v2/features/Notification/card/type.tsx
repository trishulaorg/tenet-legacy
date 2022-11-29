

type Props = {
    type : string
}

export default function NotificationType(props: Props) {
    const { type } = props
    return (
        <>
            <div className="mr-2">
                <div className="rounded-full bg-contentbg dark:bg-contentbg-dark p-2 text-2xl">
                    {type == "Comments" ? "🗨️" : (type == "Likes" ? "❤️" : "🙋‍♂️")}
                </div>
            </div>
        </>
    )
}