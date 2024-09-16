import { CiViewBoard, CiPen, CiBoxList, CiLink, CiViewTable, CiImageOn, CiFileOn, CiChat2, CiRoute, CiLocationArrow1, CiRedo, CiUndo, CiText, CiStop1 } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Toolbar = () => {
    return ( 
        <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
            <div className="bg-[var(--background-light)] rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiLocationArrow1 className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Mouse</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiViewBoard className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Section</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiText className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Text</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiStop1 className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Shapes</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiRoute className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Connect</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiPen className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Draw</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiBoxList className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>To-Do</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiLink className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Link</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiViewTable className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Tabel</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiChat2 className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Comment</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiImageOn className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Image</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiFileOn className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Upload File</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <div className="bg-[var(--background-light)] rounded-md p-1.5 flex flex-col items-center shadow-md">
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiUndo className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Undo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CiRedo className="text-3xl"/>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Redo</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
     );
}
 
export default Toolbar;