import React from 'react';
import { Checkbox, CheckboxGroup, Card, CardBody, ScrollShadow } from '@heroui/react';

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTags, onTagsChange }) => {
  return (
    <Card className="agent-card w-full">
      <CardBody className="p-md">
        <h3 className="text-lg font-semibold mb-4 text-kg-text-primary">Filter by Tags</h3>
        <ScrollShadow className="max-h-96">
          <CheckboxGroup
            value={selectedTags}
            onValueChange={onTagsChange}
            className="flex flex-col gap-3"
          >
            {tags.map((tag) => (
              <Checkbox 
                key={tag} 
                value={tag} 
                size="sm"
                classNames={{
                  base: "hover:bg-kg-bg-secondary rounded-lg p-1 transition-colors",
                  label: "text-kg-text-secondary text-sm ml-2"
                }}
              >
                {tag}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};