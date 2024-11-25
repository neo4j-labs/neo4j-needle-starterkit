import Card from './Card';
import testImg from '../assets/cardImg.png';
import { Button, Typography } from '@neo4j-ndl/react';

export default function DemoCards() {
  return (
    <div className="min-h-screen max-h-full p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 n-bg-palette-neutral-bg-default">
      <Card layout="vertical" imageSrc={testImg} imageSize="full" className="h-auto w-96">
        <Card.Header>Header text</Card.Header>
        <Card.Subheader>Subtitle or description</Card.Subheader>
        <Card.Content>
          <p>Some description about relatively important things but not too long since this is a card and not a novel. People won't read it if the description is too long.</p>
          <ul className="list-disc list-inside">
            <li>1 Key information</li>
            <li>12.59 Key information</li>
            <li>3 Key information</li>
          </ul>
          <Button><Typography variant="body-small">Test</Typography></Button>
        </Card.Content>
      </Card>
      
      <Card layout="horizontal" imageSrc={testImg} imageSize="full" className="h-60">
        <Card.Header>Header text</Card.Header>
        <Card.Subheader>Subtitle or description</Card.Subheader>
        <Card.Content>
          <p>Some description about relatively important things but not too long since this is a card and not a novel. People won't read it if the description is too long.</p>
          <ul className="list-disc list-inside">
            <li>18 Key information</li>
            <li>12.59 Key information</li>
            <li>5 Key information</li>
          </ul>
        </Card.Content>
      </Card>

      <Card layout="vertical" className="h-60">
        <Card.Header>Header text</Card.Header>
        <Card.Subheader>Subtitle or description</Card.Subheader>
        <Card.Content>
          <p>Some description about relatively important things but not too long since this is a card and not a novel. People won't read it if the description is too long.</p>
          <ul className="list-disc list-inside">
            <li>1 Key information</li>
            <li>12.59 Key information</li>
            <li>3 Key information</li>
          </ul>
        </Card.Content>
      </Card>

      <Card layout="horizontal" imageSrc={testImg} imageSize="small">
        <Card.Header>Header text</Card.Header>
        <Card.Subheader>Subtitle or description</Card.Subheader>
        <Card.Content>
          <p>Some description about relatively important things but not too long since this is a card and not a novel. People won't read it if the description is too long.</p>
          <ul className="list-disc list-inside">
            <li>18 Key information</li>
            <li>12.59 Key information</li>
            <li>5 Key information</li>
          </ul>
        </Card.Content>
      </Card>

      <Card layout="horizontal" imageSrc={testImg} imageSize="full">
        <Card.Content>
          <p>Some description about relatively important things but not too long since this is a card and not a novel. People won't read it if the description is too long.</p>
          <ul className="list-disc list-inside">
            <li>18 Key information</li>
            <li>12.59 Key information</li>
            <li>5 Key information</li>
          </ul>
        </Card.Content>
      </Card>

      <Card layout="vertical" imageSrc={testImg} imageSize="full" className="h-auto w-66">
        <Card.Content>
          <p>Some description about relatively important things but not too long since this is a card and not a novel. People won't read it if the description is too long.</p>
          <ul className="list-disc list-inside">
            <li>18 Key information</li>
            <li>12.59 Key information</li>
            <li>5 Key information</li>
          </ul>
        </Card.Content>
      </Card>
    </div>
  );
}