import { ImageResponse } from 'next/og'
import { prisma } from '@/lib/db'


export const runtime = 'nodejs'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'
export const alt = 'Christmas Greeting'

export default async function Image({ params }: { params: { id: string } }) {
    const wish = await prisma.wish.findUnique({
        where: { id: params.id },
    })

    if (!wish) {
        return new ImageResponse(
            <div style={{ background: 'black', width: '100%', height: '100%' }} />,
            { ...size }
        )
    }

    const isXmas = wish.occasion !== 'NEW_YEAR'
    const bgColor = isXmas ? '#450a0a' : '#0f172a'
    const accentColor = isXmas ? '#fbbf24' : '#22d3ee'

    return new ImageResponse(
        (
            // Image Container
            <div
                style={{
                    background: bgColor,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'serif',
                    color: 'white',
                    border: `20px double ${accentColor}`,
                }}
            >
                {/* Decorative Circle */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: accentColor,
                        color: bgColor,
                        borderRadius: '50%',
                        width: '80px',
                        height: '80px',
                        fontSize: '40px',
                        marginBottom: '20px',
                    }}
                >
                    🎁
                </div>

                <div style={{ fontSize: '30px', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '4px' }}>
                    A Special Gift For
                </div>

                <div style={{ fontSize: '80px', fontWeight: 'bold', margin: '10px 0', color: accentColor }}>
                    {wish.receiver}
                </div>

                <div style={{ fontSize: '30px', opacity: 0.8 }}>
                    From {wish.sender}
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}