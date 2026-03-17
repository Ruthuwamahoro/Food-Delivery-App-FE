// import { CheckCircle2 } from "lucide-react";
// import { AlertDialog, AlertDialogAction, AlertDialogDescription, AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogFooter } from "./ui/alert-dialog";

// export default function Confirmation() {
//     <section>
//               {/* ── Success dialog ── */}
//       <AlertDialog open={orderPlaced} onOpenChange={setOrderPlaced}>
//         <AlertDialogContent className="rounded-2xl max-w-sm">
//           <AlertDialogHeader className="items-center text-center">
//             <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-2">
//               <CheckCircle2 className="w-8 h-8 text-emerald-500" />
//             </div>
//             <AlertDialogTitle
//               className={`${playfair.className} text-2xl font-normal`}
//             >
//               Order <em>confirmed!</em>
//             </AlertDialogTitle>
//             <AlertDialogDescription className="text-[13px] text-muted-foreground font-light leading-relaxed text-center">
//               Thank you, <strong>{name}</strong>! Your order is heading to{" "}
//               <strong>{address}</strong>. Confirmation sent to{" "}
//               <strong>{email}</strong>.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter className="justify-center">
//             <AlertDialogAction asChild>
//               <Button
//                 className="gap-2 px-8"
//                 onClick={() => setOrderPlaced(false)}
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to recipes
//               </Button>
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </section>
// }