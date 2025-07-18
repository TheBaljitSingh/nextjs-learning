import { ReactNode } from "react";

export default function RootLayout({children}:{children:ReactNode}) {    return <div>
    <div className="border-b text-center">
        20% off for the next 3 days
    </div>
    {children}
    </div>
}

