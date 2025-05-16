import type { Meta, StoryObj } from '@storybook/react';

import { KanbanAddButton, KanbanBoard, KanbanItem, KanbanContent, KanbanGroup, KanbanHeader, KanbanItemLabel, KanbanItemTitle } from '../components/ui/kanban'
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';

const meta: Meta<typeof KanbanBoard> = {
  component: KanbanBoard,
}

export default meta

type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  args: {
    children: (<>
      <KanbanGroup>
        <KanbanHeader>
          <span className='text-xl font-bold'>Todo</span>
          <Button size={'icon'} variant={'ghost'} className='text-muted-foreground'><Plus /></Button>
        </KanbanHeader>
        <KanbanContent>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #1</KanbanItemTitle>
          </KanbanItem>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #2</KanbanItemTitle>
          </KanbanItem>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #3</KanbanItemTitle>
          </KanbanItem>
          <KanbanAddButton>
            <Plus />
            New
          </KanbanAddButton>
        </KanbanContent>
      </KanbanGroup>
      <KanbanGroup>
        <KanbanHeader>
          <span className='text-xl font-bold'>In Progress</span>
          <Button size={'icon'} variant={'ghost'} className='text-muted-foreground'><Plus /></Button>
        </KanbanHeader>
        <KanbanContent>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #1</KanbanItemTitle>
          </KanbanItem>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #2</KanbanItemTitle>
          </KanbanItem>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #3</KanbanItemTitle>
          </KanbanItem>
          <KanbanAddButton>
            <Plus />
            New
          </KanbanAddButton>
        </KanbanContent>
      </KanbanGroup>
      <KanbanGroup>
        <KanbanHeader>
          <span className='text-xl font-bold'>Done</span>
          <Button size={'icon'} variant={'ghost'} className='text-muted-foreground'><Plus /></Button>
        </KanbanHeader>
        <KanbanContent>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #1</KanbanItemTitle>
          </KanbanItem>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #2</KanbanItemTitle>
          </KanbanItem>
          <KanbanItem>
            <KanbanItemLabel>Project #1</KanbanItemLabel>
            <KanbanItemTitle>Task #3</KanbanItemTitle>
          </KanbanItem>
          <KanbanAddButton>
            <Plus />
            New
          </KanbanAddButton>
        </KanbanContent>
      </KanbanGroup>
    </>)
  }
}