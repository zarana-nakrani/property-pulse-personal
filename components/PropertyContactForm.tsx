import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import type { IProperty } from '@/models/Property'
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const PropertyContactForm = ({ property }: { property: IProperty }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const {data: session} = useSession();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      email,
      phone, 
      message,
      recipient: property.owner,
      property: property._id,
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await res.json();
      if(res.status === 200) {
        toast.success('Message sent successfully');
        setWasSubmitted(true);
      } else if(res.status === 400 || res.status === 401) {
        toast.error(response.Message);
        setWasSubmitted(false);
      } else {
        toast.error('Error sending message');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error sending message');
    } finally {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');

    }
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!session ? (
        <p>
          You must be logged in to send the message 
        </p>
    ) : (
      wasSubmitted ? (
        <p className='text-green-500 mb-4'>
          Your message has been sent sucessfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => {setName(e.target.value)}}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
            required
            value={phone}
            onChange={(e) => {setPhone(e.target.value)}}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => {setMessage(e.target.value)}}
          ></textarea>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="submit"
          >
            <FaPaperPlane className="mr-2" /> Send Message
          </button>
        </div>
      </form>
      )
    )}
    </div>
  )
}

export default PropertyContactForm
