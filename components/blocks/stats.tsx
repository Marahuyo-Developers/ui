import { Store, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import type React from 'react';

export type StatsWithIconProps = {
  labelDescription?: React.ReactNode,
  title: React.ReactNode,
  footer?: React.ReactNode
  icon?: LucideIcon
}

export const StatsWithIcon = (props: StatsWithIconProps) => {
  return (
    <Card>
      <CardContent>
        <div className='flex items-center justify-between'>
          {props.labelDescription && <CardDescription>{props.labelDescription}</CardDescription>}
          {props.icon && (
            <props.icon
              className={`text-muted-foreground ${!props.labelDescription ? 'ml-auto' : ''}`}
            />
          )}
        </div>
        <CardTitle className='text-3xl pt-2'>{props.title}</CardTitle>
      </CardContent>
      {props.footer && <CardFooter className='text-muted-foreground'>{props.footer}</CardFooter>}
    </Card>
  );
};
