import { Avatar } from '@/UI/Components/Avatar/Avatar';
import { Card } from '@/UI/Components/Card/Card';
import { ImagePro } from '@/UI/Components/Image/ImagePro';
import { Number } from '@/UI/Components/Number/Number';
import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { Skeleton } from '~/Components/Skeleton/Skeleton';
import { WaterfallLayout } from './WaterfallLayout';

// Generate some sample content
const generateItems = (count: number) => {
  return Array.from({ length: count }).map((_, i) => {
    const height = 100 + Math.floor(Math.random() * 200);
    return (
      <div key={ i } className="space-y-4 w-full flex flex-col">
    <ImagePro src={`https://picsum.photos/300/${height}?random=${i}`} alt={ `User ${ i }` } withSkeleton objectFit='contain' rounded='lg' height={height} />
     <motion.div
            initial={{ opacity: 1,height:'auto' }}
            animate={{ opacity: 0,height:0 }}
            transition={{ duration: 0.5,delay:3 }}
            className="space-y-4">
            <Skeleton variant="text" size="md" className="w-3/4" />
            <Skeleton variant="text" size="md" className="w-1/2" />
            <Skeleton variant="text" size="md" className="w-2/3" />
          </motion.div>
              <motion.div
            initial={{ opacity: 0,height:0 }}
            animate={{ opacity: 1,height:'auto' }}
            transition={{ duration: 0.5,delay:3 }}
            className="flex">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          </motion.div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 ">
          <Avatar 
            src={`https://i.pravatar.cc/150?img=${i % 70}`} 
              alt={ `User ${ i }` } 
            customSize="h-[20px] w-[20px] rounded-full flex"
          />
          <div>
            <h3 className="text-xs">Scott is legend {i + 1}</h3>
          </div>
        </div>

            <Number value={ Math.floor( Math.random() * 10000 ) } useShortFormat maxNumberPlaces={3} animation='fade'/>
        </div>
      </div>
    );
  });
};

const meta = {
  title: 'Layout/WaterfallLayout',
  component: WaterfallLayout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive waterfall layout component that automatically arranges items into columns with consistent gaps.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: { type: 'number', min: 0, max: 64 },
      description: 'Gap between items in pixels',
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    // gap:{sm:4,md:4,lg:6,xl:8},
    minColumnWidth:{sm:200,md:200,lg:200,xl:200},
  },
} satisfies Meta<typeof WaterfallLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with 12 items
const defaultItems = generateItems(200);

export const Default: Story = {
  args: {
    children: defaultItems,
  },
};

// Story with custom item styling
export const SocialCard: Story = {
  args: {
    minColumnWidth:{sm:250,md:250,lg:250,xl:250},
    children: Array.from( { length: 1000 } ).map( ( _, i ) =>
    {
      const height = 100 + Math.floor(Math.random() * 200);
      return (
        <Card key={ i } className="space-y-4 w-full">
          <ImagePro src={ `https://picsum.photos/300/${ height }?random=${ i }` } alt={ `User ${ i }` } withSkeleton objectFit='contain' rounded='lg' height={ height } />
          <motion.div
            // initial={{ opacity: 1,height:'auto' }}
            // animate={{ opacity: 0,height:0 }}
            // transition={{ duration: 0.5,delay:3 }}
            className="space-y-4">
            <Skeleton variant="text" size="md" className="w-3/4" />
            <Skeleton variant="text" size="md" className="w-1/2" />
            <Skeleton variant="text" size="md" className="w-2/3" />
          </motion.div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 ">
              <Avatar
                src={ `https://i.pravatar.cc/150?img=${ i % 70 }` }
                alt={ `User ${ i }` }
                customSize="h-[20px] w-[20px] rounded-full flex"
              />
              <div>
                <h3 className="text-xs">Scott { i + 1 }</h3>
              </div>
            </div>

            <Number value={ Math.floor( Math.random() * 10000 ) } useShortFormat maxNumberPlaces={ 3 } animation='fade' />
          </div>
        </Card> )
    }
    )
  },


};

// // Story with custom item styling
export const CustomItems: Story = {
  
  args: {
    children: Array.from( { length: 200 } ).map( ( _, i ) => (
(
      <div 
        key={i} 
        className="p-4 bg-white rounded-lg shadow border border-gray-200"
      >
        <h3 className="font-medium text-lg mb-2">Custom Item {i + 1}</h3>
        <p className="text-gray-600 mb-3">This is a custom item with some content.</p>
        <div 
          className="w-full bg-gradient-to-r from-blue-100 to-purple-100 rounded h-32 flex items-center justify-center text-gray-500"
        >
          Content {i + 1}
        </div>
      </div>
    ))
    ),
  },
};
