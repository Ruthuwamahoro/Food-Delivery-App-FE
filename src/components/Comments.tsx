import { playfair } from "@/data/fonts";
import { MessageSquare, Send, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { mockComments } from "@/data/testimonials";

export default function Comments() {
    return(
        <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
        <div className="flex items-center gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
            Comments
          </p>
        </div>
        <h2
          className={`${playfair.className} text-2xl font-normal text-foreground mb-8`}
        >
          What others <em>are saying</em>
        </h2>

        {/* Existing comments */}
        <div className="flex flex-col gap-4 mb-10">
          {mockComments.map((c) => (
            <Card key={c.id} className="border border-border rounded-xl">
              <CardHeader className="pb-2 pt-5 px-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 rounded-[10px]">
                      <AvatarFallback className="rounded-[10px] bg-muted text-foreground text-[12px] font-medium">
                        {c.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-[13px] font-medium text-foreground leading-none mb-1">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {c.time}
                      </p>
                    </div>
                  </div>

                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <p className="text-[13px] text-muted-foreground font-light leading-relaxed">
                  {c.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leave a comment form */}
        <Card className="border border-border rounded-xl">
          <CardHeader className="pb-2 pt-5 px-5">
            <h3
              className={`${playfair.className} text-lg font-normal text-foreground`}
            >
              Leave a <em>comment</em>
            </h3>
          </CardHeader>
          <CardContent className=" px-5 pb-5 flex flex-col gap-4">
            <div className="grid sm:grid-cols-1 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-[12px] text-muted-foreground">
                  Name
                </Label>
                <Input
                  placeholder="Your name"
                  className="h-9 text-[13px] rounded-[10px]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-[12px] text-muted-foreground">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="h-9 text-[13px] rounded-[10px]"
                />
              </div>
            </div>

            {/* Star rating picker */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-[12px] text-muted-foreground">
                Rating
              </Label>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-300 hover:fill-amber-400 hover:text-amber-400 cursor-pointer transition-colors"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-[12px] text-muted-foreground">
                Comment
              </Label>
              <Textarea
                placeholder="Share your experience with this recipe…"
                className="text-[13px] rounded-[10px] resize-none min-h-[100px]"
              />
            </div>

            <Button className="self-end h-10 px-6 gap-2 text-sm">
              <Send className="w-3.5 h-3.5" />
              Post Comment
            </Button>
          </CardContent>
        </Card>
      </section>
    )
}