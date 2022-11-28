type Props = {
    body: string
}

export default function NotificationBody(props: Props){
    const { body } = props
    return (
        <>
            <div className="h-[200px] w-full p-4 bg-contentbg dark:bg-contentbg-dark rounded-xl">
                {body}
            </div>
        </>
    )
}