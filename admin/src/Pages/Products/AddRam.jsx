import { Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState, useContext } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdCloudUpload } from 'react-icons/md'
import { getData, postData, putData, deleteData } from '../../utils/api'
import { MyContext } from '../../App'

const AddRam = () => {
    const context = useContext(MyContext)
    const [name, setName] = useState('')
    const [rams, setRams] = useState([])
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [selectedIds, setSelectedIds] = useState([])
    const [editingId, setEditingId] = useState(null)

    const fetchRams = async () => {
        try {
            setLoading(true)
            const res = await getData('/api/v1/ram')
            if (res && res.data) {
                setRams(res.data)
            } else if (res && res.success && res.data) {
                setRams(res.data)
            } else {
                setRams(res.data || [])
            }
        } catch (err) {
            console.error('Error fetching rams', err)
            context?.alertBox && context.alertBox('error', 'Error fetching RAMs')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRams()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!name || String(name).trim() === '') return context?.alertBox('error', 'Please enter RAM name')
        try {
            setSubmitting(true)
            if (editingId) {
                const res = await putData(`/api/v1/ram/${editingId}`, { name })
                if (res && res.success) {
                    context?.alertBox('success', 'RAM updated')
                    setEditingId(null)
                    setName('')
                    fetchRams()
                } else {
                    context?.alertBox('error', res?.message || 'Error updating RAM')
                }
            } else {
                const res = await postData('/api/v1/ram', { name })
                if (res && res.success) {
                    context?.alertBox('success', 'RAM created')
                    setName('')
                    fetchRams()
                } else {
                    context?.alertBox('error', res?.message || 'Error creating RAM')
                }
            }
        } catch (err) {
            console.error('Submit RAM error', err)
            context?.alertBox('error', 'Network error')
        } finally {
            setSubmitting(false)
        }
    }

    const onEdit = (ram) => {
        setEditingId(ram._id)
        setName(ram.name)
    }

    const onDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this RAM?')) return
        try {
            const res = await deleteData(`/api/v1/ram/${id}`)
            if (res && !res.error) {
                context?.alertBox('success', 'RAM deleted')
                fetchRams()
            } else {
                context?.alertBox('error', res?.message || 'Error deleting RAM')
            }
        } catch (err) {
            console.error('Delete RAM error', err)
            context?.alertBox('error', 'Network error')
        }
    }

    const toggleSelect = (id) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
    }

    const onDeleteSelected = async () => {
        if (!selectedIds.length) return context?.alertBox('error', 'Select RAM(s) first')
        if (!window.confirm(`Delete ${selectedIds.length} selected RAM(s)?`)) return
        try {
            // delete sequentially
            for (const id of selectedIds) {
                // ignore individual errors
                await deleteData(`/api/v1/ram/${id}`)
            }
            context?.alertBox('success', 'Selected RAM(s) deleted')
            setSelectedIds([])
            fetchRams()
        } catch (err) {
            console.error('Bulk delete error', err)
            context?.alertBox('error', 'Error deleting selected RAMs')
        }
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-[600] text-[rgba(0,0,0,0.8)] pl-2 pt-5 ">
                    Add Ram Options
                </h2>
                <div>
                    <Button onClick={onDeleteSelected} disabled={!selectedIds.length} className='!bg-red-500 !text-white !py-1 !px-3 !rounded-md !hover:bg-red-600 !text-[13px]'>
                        Delete Selected
                    </Button>
                </div>
            </div>

            <form onSubmit={onSubmit} className="card my-3 shadow-md sm:rounded-lg bg-white w-[65%] p-5" >
                <div className="col">
                    <h3 className='text-[14px] font-[500] mb-1'>RAM Name</h3>
                    <input
                        type="text"
                        placeholder='e.g. 4GB'
                        className='w-full h-[40px] rounded-[5px] focus:outline-none border border-[rgba(0,0,0,0.1)] focus:border-[rgba(0,0,0,0.4)] p-3'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <Button type="submit" disabled={submitting} className='!w-full !font-[600] !text-[16px] !bg-[#3872fa] !text-white !py-2 !rounded-[5px] !mt-5 !hover:bg-[#1a6df1]'>
                    <MdCloudUpload size={25} className='mr-2' />
                    {submitting ? <span className='flex items-center gap-2'><CircularProgress size={18} /> Saving...</span> : (editingId ? 'Update RAM' : 'Publish and View')}
                </Button>
            </form>

            <div className="card my-3 shadow-md sm:rounded-lg bg-white w-[65%] p-5" >
                <div className="relative overflow-x-auto mt-5 pb-5">
                    {loading ? (
                        <div className='w-full flex items-center justify-center py-8'><CircularProgress /></div>
                    ) : (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-[13px] text-gray-700 uppercase bg-white ">
                                <tr >
                                    <th>
                                        <input
                                            type="checkbox"
                                            className='w-[20px] h-[20px]'
                                            checked={selectedIds.length === rams.length && rams.length > 0}
                                            onChange={(e) => setSelectedIds(e.target.checked ? rams.map(r => r._id) : [])}
                                        />
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Product Rams
                                    </th>
                                    <th scope="col" className="px-4 py-3 whitespace-nowrap">
                                        Action
                                    </th>

                                </tr>
                            </thead>
                            <tbody className='text-[13px]'>
                                {rams.map(ram => (
                                    <tr key={ram._id} className="bg-white border-b hover:bg-gray-50 ">
                                        <td className="w-4 p-4">
                                            <input
                                                type="checkbox"
                                                className='w-[20px] h-[20px]'
                                                checked={selectedIds.includes(ram._id)}
                                                onChange={() => toggleSelect(ram._id)}
                                            />
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {ram.name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <Button onClick={() => onEdit(ram)} className='!bg-yellow-500 !text-white !py-1 !px-3 !rounded-md !hover:bg-yellow-600 !text-[13px] mr-2'>
                                                Edit
                                            </Button>
                                            <Button onClick={() => onDelete(ram._id)} className='!bg-red-500 !text-white !py-1 !px-3 !rounded-md !hover:bg-red-600 !text-[13px]'>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>


        </>
    )
}

export default AddRam