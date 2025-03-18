'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import RoomCalendar from './RoomCalendar';

const roomTypes = [
  {
    id: 'standard',
    name: 'Standard Room',
    price: 199,
    description: 'Comfortable room with essential amenities',
    image: '/images/rooms/standard.jpg',
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    price: 299,
    description: 'Spacious room with premium amenities',
    image: '/images/rooms/deluxe.jpg',
  },
  {
    id: 'suite',
    name: 'Suite',
    price: 499,
    description: 'Luxury suite with separate living area',
    image: '/images/rooms/suite.jpg',
  },
];

const EnhancedBookingModal = ({ isOpen, closeModal }) => {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
  const [bookingData, setBookingData] = useState({
    guests: { adults: 1, children: 0 },
    specialRequests: '',
    addons: {
      breakfast: false,
      parking: false,
      spa: false,
    }
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log({ selectedRoom, bookingData });
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    {step === 1 ? 'Select Room Type' : 
                     step === 2 ? 'Choose Dates' : 'Additional Details'}
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <IoClose size={24} />
                  </button>
                </div>

                {/* Step 1: Room Selection */}
                {step === 1 && (
                  <RadioGroup value={selectedRoom} onChange={setSelectedRoom}>
                    <div className="space-y-4">
                      {roomTypes.map((room) => (
                        <RadioGroup.Option
                          key={room.id}
                          value={room}
                          className={({ checked }) =>
                            `${
                              checked ? 'ring-2 ring-primary' : ''
                            } relative rounded-lg p-4 cursor-pointer focus:outline-none`
                          }
                        >
                          {({ checked }) => (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className="font-medium text-gray-900"
                                  >
                                    {room.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="text-gray-500"
                                  >
                                    <span>{room.description}</span>
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              <div className="text-sm font-semibold text-gray-900">
                                ${room.price}
                              </div>
                            </div>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {/* Step 2: Date Selection */}
                {step === 2 && (
                  <div>
                    <RoomCalendar roomId={selectedRoom.id} />
                  </div>
                )}

                {/* Step 3: Additional Details */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Number of Guests
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600">Adults</label>
                          <select
                            value={bookingData.guests.adults}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                guests: {
                                  ...bookingData.guests,
                                  adults: parseInt(e.target.value),
                                },
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          >
                            {[1, 2, 3, 4].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600">Children</label>
                          <select
                            value={bookingData.guests.children}
                            onChange={(e) =>
                              setBookingData({
                                ...bookingData,
                                guests: {
                                  ...bookingData.guests,
                                  children: parseInt(e.target.value),
                                },
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          >
                            {[0, 1, 2, 3].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Add-ons
                      </h3>
                      <div className="space-y-2">
                        {Object.entries({
                          breakfast: 'Breakfast Included (+$20/day)',
                          parking: 'Parking Space (+$15/day)',
                          spa: 'Spa Access (+$50/day)',
                        }).map(([key, label]) => (
                          <label
                            key={key}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              checked={bookingData.addons[key]}
                              onChange={(e) =>
                                setBookingData({
                                  ...bookingData,
                                  addons: {
                                    ...bookingData.addons,
                                    [key]: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-gray-600">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests
                      </label>
                      <textarea
                        value={bookingData.specialRequests}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            specialRequests: e.target.value,
                          })
                        }
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        placeholder="Any special requirements..."
                      />
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={step === 3 ? handleSubmit : handleNext}
                    className="ml-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                  >
                    {step === 3 ? 'Complete Booking' : 'Next'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EnhancedBookingModal; 