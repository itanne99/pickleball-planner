import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { Card, Form, Button, Row, Col, Badge, InputGroup } from 'react-bootstrap';
import { FiArrowLeft, FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
import { getMatchById, getTeamById } from '@/data/mock';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SectionHeader from '@/components/SectionHeader';
import { useToast } from '@/components/ToastProvider';

const setSchema = z.object({
  setNumber: z.number(),
  homeScore: z.coerce.number().min(0).max(21),
  awayScore: z.coerce.number().min(0).max(21),
});

const scorecardSchema = z.object({
  sets: z.array(setSchema).min(1, 'At least one set is required').max(5),
  notes: z.string().optional(),
});

export default function NewScorecardPage() {
  const router = useRouter();
  const { matchId } = router.query;
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const match = matchId ? getMatchById(matchId) : null;
  const homeTeam = match ? getTeamById(match.homeTeamId) : null;
  const awayTeam = match ? getTeamById(match.awayTeamId) : null;

  const { register, control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(scorecardSchema),
    defaultValues: {
      sets: [{ setNumber: 1, homeScore: 0, awayScore: 0 }],
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'sets' });
  const sets = watch('sets');

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      addToast('Scorecard submitted successfully!', 'success');
      setIsSubmitting(false);
      router.push(`/scorecard/${matchId}`);
    }, 1000);
  };

  const addSet = () => {
    append({ setNumber: fields.length + 1, homeScore: 0, awayScore: 0 });
  };

  const removeSet = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  if (!match) {
    return (
      <>
        <Head><title>New Scorecard | Pickleball Planner</title></Head>
        <div className="text-center py-5">
          <h2>No match selected</h2>
          <Link href="/schedule" className="btn btn-primary mt-3">Select a Match</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Enter Scorecard | Pickleball Planner</title>
        <meta name="description" content={`Enter scorecard for ${homeTeam?.name} vs ${awayTeam?.name}`} />
      </Head>

      <div className="mb-4">
        <Link href={`/scorecard/${match.id}`} className="btn btn-outline-secondary btn-sm">
          <FiArrowLeft className="me-1" /> Back to Match
        </Link>
      </div>

      <SectionHeader
        title="Enter Scorecard"
        subtitle={`${homeTeam?.name} vs ${awayTeam?.name} - ${new Date(match.date).toLocaleDateString()}`}
      />

      <Card className="glass-panel border-0">
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Sets</h6>
                <Button variant="outline-primary" size="sm" onClick={addSet} disabled={fields.length >= 5}>
                  <FiPlus className="me-1" /> Add Set
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="bg-dark bg-opacity-50 border-secondary mb-2">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Badge bg="secondary">Set {index + 1}</Badge>
                      {fields.length > 1 && (
                        <Button variant="outline-danger" size="sm" onClick={() => removeSet(index)}>
                          <FiTrash2 size={14} />
                        </Button>
                      )}
                    </div>
                    <Row className="g-2 align-items-center">
                      <Col>
                        <Form.Label className="small text-muted">{homeTeam?.name}</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="21"
                          {...register(`sets.${index}.homeScore`)}
                          isInvalid={errors.sets?.[index]?.homeScore}
                        />
                      </Col>
                      <Col xs="auto" className="pt-4">
                        <span className="fw-bold text-muted">-</span>
                      </Col>
                      <Col>
                        <Form.Label className="small text-muted">{awayTeam?.name}</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="21"
                          {...register(`sets.${index}.awayScore`)}
                          isInvalid={errors.sets?.[index]?.awayScore}
                        />
                      </Col>
                    </Row>
                    {errors.sets?.[index] && (
                      <Form.Text className="text-danger">
                        {errors.sets[index]?.homeScore?.message || errors.sets[index]?.awayScore?.message}
                      </Form.Text>
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Notes (optional)</Form.Label>
              <Form.Control as="textarea" rows={3} {...register('notes')} placeholder="Any additional notes about the match..." />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Link href={`/scorecard/${match.id}`} className="btn btn-secondary">Cancel</Link>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <FiSave className="me-1" /> {isSubmitting ? 'Submitting...' : 'Submit Scorecard'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
