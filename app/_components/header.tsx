import LogoutButton from "./logout-button";
import Modal from "./modal";
import prisma from "@/lib/prisma";


export default function Header(){
    
    return(
                    <header className="w-full flex h-fit justify-center px-4 py-4 items-center mb-8  p-2">
                        <div className="w-full flex justify-between items-center bg-[#000000] p-3 rounded-md shadow-md">
        
                        <h1 className="text-white text-3xl font-extrabold">Black Post</h1>
                        <div className="flex gap-4">
                            <Modal></Modal>
                            <LogoutButton></LogoutButton>
                        </div>
                        </div>
                    </header>
    );
}