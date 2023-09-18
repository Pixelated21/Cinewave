'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { Users } from "lucide-react"
import { LifeBuoy } from "lucide-react"
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { getInitials } from "@/lib/utils"

export default function AuthButton() {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger className="hover:ring-2 ring-1 ring-white duration-300" asChild>
                        <Avatar className="h-8 w-8 md:h-10 md:w-10  cursor-pointer">
                            <AvatarImage src={session.user?.image!} alt="@proximity" />
                            <AvatarFallback>{getInitials((session.user?.name || session.user?.email) ?? "")}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-52">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link className="flex w-full" href={'/profile'}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => signOut()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </>
        )
    }
    return (
        <Button variant={'secondary'} onClick={() => signIn()}>Log In</Button>
    )
}