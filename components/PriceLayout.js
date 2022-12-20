import React from 'react'

const PriceLayout = () => {
  return (
    <>
        <div className="flex flex-no-wrap">
                            <Label className="w-2/5 block text-sm mb-4 mt-4">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Name
                                </span>
                                <Input 
                                    type="text" 
                                    className={ "border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                                    placeholder="Insert price name"
                                    onChange={(e) => setName([e.target.value])}
                                    disabled={loading == false ? '':true}
                                    value={name}
                                >
                                </Input>
                            </Label>
                            <Label className="w-2/5 block text-sm mb-4 mt-4 mx-4">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Duration
                                </span>
                                <Select 
                                   
                                    className={ "border-indigo-100 focus:border-indigo-400  block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                                    
                                    onChange={(e) => setDuration([e.target.value])}
                                    disabled={loading == false ? '':true}
                                    value={duration}

                                    
                                >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                                
                                </Select>
                               
                                
                                
                            </Label>
                        </div>
                        <div className="flex flex-no-wrap">
                            <Label className="w-2/5 block text-sm mb-4 mt-4">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Price
                                </span>
                                <Input 
                                    type="number" 
                                    className={ "border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                                    placeholder="Insert price"
                                    onChange={(e) => setPrice([e.target.value])}
                                    disabled={loading == false ? '':true}
                                    value={price}
                                >
                                </Input>
                            </Label>
                            <Label className="w-2/5 block text-sm mb-4 mt-4 mx-4">
                                <span className="text-gray-700 dark:text-gray-400">
                                    Discount
                                </span>
                                <Input 
                                    type="number" 
                                    className={ "border-indigo-100 focus:border-indigo-400 block w-full  mt-1 text-sm dark:text-gray-300 dark:bg-gray-700  focus:outline-none focus:shadow-outline-red input input-sm"}

                                    placeholder="Insert discount"
                                    onChange={(e) => setDiscount([e.target.value])}
                                    disabled={loading == false ? '':true}
                                    value={discount}
                                >
                                </Input>
                            </Label>
                        </div>
    </>
  )
}

export default PriceLayout
