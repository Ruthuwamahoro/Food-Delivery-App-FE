import Payment from "@/components/Payment";

export default function CheckoutPage() {
    return(
        <main className="bg-background flex items-center justify-center px-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <Payment />
            </div>
        </main>
    )
}