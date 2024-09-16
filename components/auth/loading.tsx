import Logo from "@/components/logo-colors"

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center animate-pulse duration-700">
            <Logo></Logo>
        </div>
    )
}