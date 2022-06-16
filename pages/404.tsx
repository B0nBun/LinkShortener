export default function FourOFour() {
    return (
        <div className="body-wrapper px-3 max-w-md mx-auto flex items-center justify-center">
            <div className="flex text-lg tablet:text-xl text-center justify-around gap-2 items-center w-full">
                <h1 className="text-4xl font-bold text-red">404</h1>
                <div className="h-16 w-[5px] bg-red"/>
                <p>Page is not found</p>
            </div>
        </div>
    )
}