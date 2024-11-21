import { FaBookmark } from 'react-icons/fa'
import React from 'react'
import { IProperty } from '@/models/Property'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { UserSession } from '@/utils/authOptions'

const BookmarksButton = ({ property }: { property: IProperty }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()
  const userId = (session as UserSession)?.user.id

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }
    const checkBookMarkStatus = async () => {
      try {
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        })

        if (res.status === 200) {
          const data = await res.json()
          setIsBookmarked(data.isBookmarked)
          setLoading(false);
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    checkBookMarkStatus()
  }, [property._id, userId])

  const handleClick = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      })

      if (res.status === 200) {
        const data = await res.json()
        toast.success(data.message)
        setIsBookmarked(data.isBookmarked)
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p className="text-center">Loading...</p>

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  )
}

export default BookmarksButton
