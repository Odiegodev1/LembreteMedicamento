import { auth } from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

function detectarRedeSocial(url: string): string {
  if (url.includes("instagram.com")) return "instagram"
  if (url.includes("twitter.com") || url.includes("x.com")) return "twitter"
  if (url.includes("tiktok.com")) return "tiktok"
  if (url.includes("facebook.com")) return "facebook"
  if (url.includes("linkedin.com")) return "linkedin"
  if( url.includes("github.com")) return "github"
  return "outra"
}


export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { socialLinks: true },
  })

  return NextResponse.json(user?.socialLinks ?? [])
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if(!session || !session.user?.email){
        return NextResponse.json({error: "Usuário não autenticado"}, {status: 401});
    }

    const {url} = await request.json();
    const platform = detectarRedeSocial(url);

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!user){
        return NextResponse.json({error: "Usuário nao encontrado"}, {status: 404});
    }

    await prisma.socialLink.create({
        data: {
            url: url,
            platform: platform,
            userId: user.id
        }
    })

    return NextResponse.json({message: "Link criado com sucesso"}, {status: 201})
}