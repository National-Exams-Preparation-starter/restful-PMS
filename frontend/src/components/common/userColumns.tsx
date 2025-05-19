// 'use client';

// import UserCard from '@/components/common/user-card';
// import { cn } from '@/lib/utils';
// import { Icon } from '@iconify/react';
// import { ColumnDef } from '@tanstack/react-table';
// import UserDialog from '@/components/common/UserDialog';
// import { useState } from 'react';

// export const UserColumns: ColumnDef<UserDto>[] = [
//   {
//     header: () => (
//       <div>
//         <h2 className="text-start pl-2">Name</h2>
//       </div>
//     ),
//     accessorKey: 'name',
//     cell: ({ row }) => {
//       return (
//         <div className=" pl-5 flex items-center justify-between gap-1 w-[300px]">
//           <UserCard
//             size="small"
//             isCollapsed={false}
//             name={row.original.name}
//             username={row.original.username}
//           />
//         </div>
//       );
//     },
//   },
//   {
//     header: ({ column }) => (
//       <div
//         className="flex items-center gap-2 cursor-pointer"
//         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//       >
//         <h2 className="text-start">Phone Number</h2>
//         <Icon
//           icon={
//             column.getIsSorted() === 'asc'
//               ? 'tabler:arrow-up'
//               : 'tabler:arrow-down'
//           }
//           width={16}
//           height={16}
//         />
//       </div>
//     ),
//     accessorKey: 'phone',
//     enableSorting: true,
//     sortingFn: 'alphanumeric',
//     cell: ({ row }) => {
//       return (
//         <div className="py-2 pl-5 flex items-center justify-between gap-1">
//           <h2 className="text-secondary-gray font-medium">
//             {row.original.phone}
//           </h2>
//         </div>
//       );
//     },
//   },
//   {
//     header: () => (
//       <div>
//         <h2>Email Address</h2>
//       </div>
//     ),
//     accessorKey: 'email',
//     cell: ({ row }) => {
//       return (
//         <div className="flex items-center gap-1 py-2 px-6">
//           <h2 className="text-secondary-gray font-medium">
//             {row.original.email}
//           </h2>
//         </div>
//       );
//     },
//   },
//   {
//     header: () => (
//       <div>
//         <h2>Institution</h2>
//       </div>
//     ),
//     accessorKey: 'institution',
//     cell: ({ row }) => {
//       return (
//         <div className="py-2 px-6">
//           <h2 className="text-secondary-gray text-sm font-normal leading-[22px]">
//             {row.original.institution}
//           </h2>
//         </div>
//       );
//     },
//   },
//   {
//     header: () => (
//       <div className="flex items-center gap-1">
//         <h2 className="text-center">Role</h2>
//         <Icon
//           icon={'material-symbols-light:help-outline'}
//           width={16}
//           height={16}
//           className="mt-0.5"
//         />
//       </div>
//     ),
//     accessorKey: 'role',
//     cell: ({ row }) => {
//       return (
//         <div className="py-2 pl-6">
//           <h2 className="text-secondary-gray text-sm font-normal leading-[22px]">
//             {row.original.role}
//           </h2>
//         </div>
//       );
//     },
//   },
//   {
//     header: ({ column }) => (
//       <div
//         className="flex items-center justify-center gap-2 cursor-pointer"
//         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//       >
//         <h2 className="text-center">status</h2>
//         <Icon
//           icon={
//             column.getIsSorted() === 'asc'
//               ? 'tabler:arrow-up'
//               : 'tabler:arrow-down'
//           }
//           width={16}
//           height={16}
//         />
//       </div>
//     ),
//     accessorKey: 'status',
//     enableSorting: true,
//     sortingFn: 'alphanumeric',
//     cell: ({ row }) => {
//       return (
//         <div className="py-2 px-2 flex items-center justify-center">
//           <div className="py-[2px] px-[6px] w-fit flex items-center gap-1 border border-[#D5D7DA] rounded-[6px]">
//             <Icon
//               icon={'icon-park-outline:dot'}
//               className={cn(
//                 row.original.status === 'active'
//                   ? 'text-success'
//                   : 'text-orange-600'
//               )}
//             />
//             <h2 className="text-[#414651] font-medium text-center text-sm">
//               {row.original.status}
//             </h2>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     header: '',
//     accessorKey: 'username',
//     cell: ({ row }) => {
//       const user = row.original;
//       const [editOpen, setEditOpen] = useState(false);
//       const [deleteOpen, setDeleteOpen] = useState(false);
//       const [activateOpen, setActivateOpen] = useState(false);
//       const [deactivateOpen, setDeactivateOpen] = useState(false);

//       const handleDelete = (user: UserDto) => {
//         console.log('delete', user.username);
//         setDeleteOpen(false);
//       };

//       const handleEdit = (user: UserDto) => {
//         console.log('edit', user.username);
//         setEditOpen(false);
//       };

//       const handleActivate = (user: UserDto) => {
//         console.log('activate', user.username);
//         setActivateOpen(false);
//       };

//       const handleDeactivate = (user: UserDto) => {
//         console.log('deactivate', user.username);
//         setDeactivateOpen(false);
//       };

//       return (
//         <div className="py-2 flex items-center gap-1">
//           <UserDialog
//             type="delete"
//             user={user}
//             onConfirm={handleDelete}
//             open={deleteOpen}
//             onOpenChange={setDeleteOpen}
//           />
//           <UserDialog
//             type="edit"
//             user={user}
//             onConfirm={handleEdit}
//             open={editOpen}
//             onOpenChange={setEditOpen}
//           />
//           {user.status === 'inactive' ? (
//             <UserDialog
//               type="activate"
//               user={user}
//               onConfirm={handleActivate}
//               open={activateOpen}
//               onOpenChange={setActivateOpen}
//             />
//           ) : (
//             <UserDialog
//               type="deactivate"
//               user={user}
//               onConfirm={handleDeactivate}
//               open={deactivateOpen}
//               onOpenChange={setDeactivateOpen}
//             />
//           )}

//           {/* Icons for actions */}
//           <div className="flex gap-3">
//             <Icon
//               icon="prime:pencil"
//               onClick={() => setEditOpen(true)}
//               className="cursor-pointer"
//               width={20}
//               height={20}
//             />
//             <Icon
//               icon="mynaui:trash"
//               onClick={() => setDeleteOpen(true)}
//               className="cursor-pointer"
//               width={20}
//               height={20}
//             />
//             {user.status === 'inactive' ? (
//               <Icon
//                 icon="mdi:lock-open-outline"
//                 onClick={() => setActivateOpen(true)}
//                 className="cursor-pointer"
//                 width={20}
//                 height={20}
//               />
//             ) : (
//               <Icon
//                 icon="mdi:lock-outline"
//                 onClick={() => setDeactivateOpen(true)}
//                 className="cursor-pointer"
//                 width={20}
//                 height={20}
//               />
//             )}
//           </div>
//         </div>
//       );
//     },
//   },
// ];
