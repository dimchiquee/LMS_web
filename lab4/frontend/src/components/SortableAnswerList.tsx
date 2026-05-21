import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

type SortableAnswerListProps = {
  items: string[];
  onChange: (items: string[]) => void;
};

type SortableItemProps = {
  item: string;
};

function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem ref={setNodeRef} style={style} disablePadding sx={{ mb: 1 }}>
      <Paper sx={{ width: "100%" }}>
        <ListItemButton {...attributes} {...listeners}>
          <ListItemIcon>
            <DragIndicatorIcon />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItemButton>
      </Paper>
    </ListItem>
  );
}

function SortableAnswerList({ items, onChange }: SortableAnswerListProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = items.indexOf(String(active.id));
    const newIndex = items.indexOf(String(over.id));

    onChange(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <List>
          {items.map((item) => (
            <SortableItem key={item} item={item} />
          ))}
        </List>
      </SortableContext>
    </DndContext>
  );
}

export default SortableAnswerList;