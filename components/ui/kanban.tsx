
import type React from 'react'
import { Card, CardContent } from './card'
import { Button } from './button'

export type KanbanBoardProps = {
  children: React.ReactNode
}

export const KanbanBoard = (props: KanbanBoardProps) => {
  return (
    <div className='flex flex-row items-start gap-10'>{props.children}</div>
  )
}

export type KanbanGroupProps = {
  children: React.ReactNode
}

export const KanbanGroup = (props: KanbanGroupProps) => {
  return (
    <div className='min-w-96'>
      <div className='flex flex-col gap-2.5'>{props.children}</div>
    </div>
  )
}

export type KanbanContentProps = {
  children: React.ReactNode
}

export const KanbanContent = (props: KanbanContentProps) => {
  return (
    <div className='flex flex-col gap-2.5'>{props.children}</div>
  )
}

export type KanbanItemProps = {
  children: React.ReactNode
}

export const KanbanItem = (props: KanbanItemProps) => {
  return (
    <Card className='bg-accent py-2'>
      <CardContent>{props.children}</CardContent>
    </Card>
  )
}

export type KanbanItemTitleProps = {
  children: React.ReactNode
}

export const KanbanItemTitle = (props: KanbanItemTitleProps) => {
  return (
    <div className='text-lg font-semibold'>{props.children}</div>
  )
}

export type KanbanItemLabel = {
  children: React.ReactNode
}

export const KanbanItemLabel = (props: KanbanItemLabel) => {
  return <div className='text-muted-foreground text-xs'>{props.children}</div>
}

export type KanbanHeaderProps = {
  children: React.ReactNode
}

export const KanbanHeader = (props: KanbanHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>{props.children}</div>
  )
}

export type KanbanAddButtonProps = {
  children: React.ReactNode
}

export const KanbanAddButton = (props: KanbanAddButtonProps) => {
  return (
    <Button variant={'ghost'} className='justify-start text-muted-foreground'>{props.children}</Button>
  )
}