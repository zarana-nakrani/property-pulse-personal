import React from 'react'

type Props = {
    heading: string,
    backgroundColor: string,
    textColor?: string,
    buttonInfo: {
        text: string,
        link: string,
        backgroundColor: string,
    },
    children: string,
}

const InfoBox = ({
    heading,
    backgroundColor = 'bg-gray-100',
    textColor = 'text-gray-800',
    buttonInfo,
    children
}: Props) => {
  return (
    <>
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
                        <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
                        <p className='mt-2 mb-4'>
                            {children}
                        </p>
                        <a href={buttonInfo.link} className={`inline-block text-white ${buttonInfo.backgroundColor} rounded-lg px-4 py-2 hover:bg-gray-700`}>
                            {buttonInfo.text}
                        </a>
                    </div>
    </>
  )
}

export default InfoBox