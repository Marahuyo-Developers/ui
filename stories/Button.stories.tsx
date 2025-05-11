import type { Meta, StoryObj } from '@storybook/react';

import {Button} from "../components/ui/button"
import { Loader } from 'lucide-react';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const VariantDefault: Story = {
  args: {
    variant:'default',
    children:'Button'
  },
};

export const VariantSecondary: Story = {
  args: {
    variant:'secondary',
    children:'Button'
  }
}

export const VariantOutline: Story = {
  args: {
    variant:'outline',
    children:'Button'
  }
}

export const VariantGhost:Story = {
  args: {
    variant:'ghost',
    children:"Button"
  }
}

export const VariantLink:Story = {
  args:{
    variant:'link',
    children:'Button'
  }
}

export const VariantDestructive:Story = {
  args:{
    variant:'destructive',
    children:'Button'
  }
}

export const IsLoading: Story = {
  args: {
    variant:'default',
    children:'Loading',
    isLoading:true
  },
};

export const IsLoadingWithCustomIcon: Story = {
  args:{
   variant:'default',
   children:'Loading',
   isLoading:true,
   loadingIcon:<Loader className='animate-spin' />
  }
}