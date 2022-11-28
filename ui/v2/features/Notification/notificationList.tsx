import NotificationCard from './card/index'

export default function NotificationList(){
    return (
        <>
            <NotificationCard />
            <NotificationCard />
            {/* Placeholder cards */}
            <div className="flex flex-col">
                <div className="h-[200px] w-[100%] p-[20px] m-[20px] bg-contentbg dark:bg-contentbg-dark rounded">
                    Post 1
                </div>
                <div className="h-[200px] w-[100%] p-[20px] m-[20px] bg-contentbg dark:bg-contentbg-dark rounded">
                    Post 2
                </div>
            </div>
        </>
    )
}