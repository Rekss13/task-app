import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./task";

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: 'white';
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'darkcyan' : 'white')};
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'darkcyan' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !(nextProps.tasks === this.props.tasks);
    }
    render() {
        return this.props.tasks.map(
            (task, index) => <Task key={task.id} task={task} index={index} />
        );
    }
}

export default class Column extends React.Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.column.id}
                index={this.props.index}
            >
                {provided => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <Title>{this.props.column.title}</Title>
                        <Droppable
                            droppableId={this.props.column.id}
                            type='task'
                            isDropDisabled={this.props.isDropDisabled}
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <InnerList tasks={this.props.tasks} />
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        );
    }
}