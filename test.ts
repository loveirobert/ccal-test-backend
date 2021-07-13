import assert from 'assert';
import { IdeaService } from './idea-service';
import { BasicIdea } from './entities/BasicIdea';
import { ToDo } from './entities/ToDo';
import { Concept } from './entities/Concept';
import { Actions } from './constants';

(async () => {
  let testNotificationFunction = (notification: any) => {};
  let notifiationCalled = 0;
  
  const notificationService = {
    notify: async (payload: any) => {
      notifiationCalled += 1;
      testNotificationFunction(payload);
    },
  };
  const ideaService = new IdeaService(notificationService);

  // store basic idea
  console.log('Should store basic idea');
  const basicIdeaTitle = 'basic idea title';
  const basicIdeaDescription = 'basic idea description';
  const basicIdea = new BasicIdea({ title: basicIdeaTitle, description: basicIdeaDescription });
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.strictEqual(payload.action, Actions.create);
    assert.strictEqual(payload.idea, basicIdea);
  };
  let storedbasicIdea = await ideaService.create(basicIdea);

  assert.strictEqual(storedbasicIdea.title, basicIdeaTitle);
  assert.strictEqual(storedbasicIdea.description, basicIdeaDescription);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // store todo
  console.log('Should store todo');
  const toDoTitle = 'todo title';
  const toDoDescription = 'todo description';
  const toDoDone = false;
  const toDo = new ToDo({ title: toDoTitle, description: toDoDescription, done: toDoDone });
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.strictEqual(payload.action, Actions.create);
    assert.strictEqual(payload.idea, toDo);
  };
  let storedToDo = await ideaService.create(toDo);
  assert.strictEqual(storedToDo.title, toDoTitle);
  assert.strictEqual(storedToDo.description, toDoDescription);
  assert.strictEqual(storedToDo.done, toDoDone);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // store concept
  console.log('Should store concept');
  const conceptTitle = 'concept title';
  const conceptDescription = 'concept description';
  const conceptReferences = ['http://'];
  const concept = new Concept({ title: conceptTitle, description: conceptDescription, references: conceptReferences});
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.strictEqual(payload.action, Actions.create);
    assert.strictEqual(payload.idea, concept);
  };
  let storedConcept = await ideaService.create(concept);
  assert.strictEqual(storedConcept.title, conceptTitle);
  assert.strictEqual(storedConcept.description, conceptDescription);
  assert.deepStrictEqual(storedConcept.references, conceptReferences);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // update basic idea
  console.log('Should update basic idea');
  const basicIdeaTitleUpdated = 'basic idea title updated';
  const basicIdeaDescriptionUpdated = 'basic idea description updated';
  storedbasicIdea.title = basicIdeaTitleUpdated;
  storedbasicIdea.description = basicIdeaDescriptionUpdated;
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.strictEqual(payload.action, Actions.update);
    assert.strictEqual(payload.idea, storedbasicIdea);
  };
  storedbasicIdea = await ideaService.update(storedbasicIdea);
  assert.strictEqual(storedbasicIdea.title, basicIdeaTitleUpdated);
  assert.strictEqual(storedbasicIdea.description, basicIdeaDescriptionUpdated);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // partial update basic idea with notification
  console.log('Should partial update basic idea with notification');
  const basicIdeaTitlePartialUpdated = 'basic idea title partial updated';
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.strictEqual(payload.action, Actions.update);
    assert.strictEqual(payload.idea.title, basicIdeaTitlePartialUpdated);
  };
  storedbasicIdea = await ideaService.update({ id: storedbasicIdea.id, title: basicIdeaTitlePartialUpdated });
  assert.strictEqual(storedbasicIdea.title, basicIdeaTitlePartialUpdated);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // partial update basic idea without notification
  console.log('Should partial update basic idea without notification');
  const basicIdeaDescriptionPartialUpdated = 'basic idea description partial updated';
  notifiationCalled = 0;
  testNotificationFunction = () => {
  };
  storedbasicIdea = await ideaService.update({ id: storedbasicIdea.id, description: basicIdeaDescriptionPartialUpdated });
  assert.strictEqual(storedbasicIdea.description, basicIdeaDescriptionPartialUpdated);
  assert.strictEqual(notifiationCalled, 0);
  console.log('OK - Passed');

  // update todo
  console.log('Should update todo');
  const toDoTitleUpdated = 'todo title updated';
  const toDoDescriptionUpdated = 'todo description updated';
  const toDoDoneUpdated = true;
  storedToDo.title = toDoTitleUpdated;
  storedToDo.description = toDoDescriptionUpdated;
  storedToDo.done = toDoDoneUpdated;
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.strictEqual(payload.action, Actions.update);
    assert.strictEqual(payload.idea.done, storedToDo.done);
  };
  storedToDo = await ideaService.update(toDo);
  assert.strictEqual(storedToDo.title, toDoTitleUpdated);
  assert.strictEqual(storedToDo.description, toDoDescriptionUpdated);
  assert.strictEqual(storedToDo.done, toDoDoneUpdated);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // partial update todo without notification
  console.log('Should partial update todo without notification');
  const toDoDescriptionPartialUpdated = 'todo description partial updated';
  notifiationCalled = 0;
  testNotificationFunction = () => {
  };
  storedToDo = await ideaService.update<ToDo>({ id: storedToDo.id, description: toDoDescriptionPartialUpdated });
  assert.strictEqual(storedToDo.description, toDoDescriptionPartialUpdated);
  assert.strictEqual(notifiationCalled, 0);
  console.log('OK - Passed');

  // partial update todo with notification
  console.log('Should partial update todo with notification');
  const toDoDonePartialUpdated = false;
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.strictEqual(payload.action, Actions.update);
    assert.deepStrictEqual(payload.idea.done, toDoDonePartialUpdated); 
  };
  storedToDo = await ideaService.update<ToDo>({ id: storedToDo.id, done: toDoDonePartialUpdated });
  assert.strictEqual(storedToDo.description, toDoDescriptionPartialUpdated);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // update concept
  console.log('Should update concept');
  const conceptTitleUpdated = 'concept title updated';
  const conceptDescriptionUpdated = 'concept description updated';
  const conceptDoneUpdated = true;
  const conceptReferencesUpdated = ['http://', 'http://'];
  concept.title = conceptTitleUpdated;
  concept.description = conceptDescriptionUpdated;
  concept.done = conceptDoneUpdated;
  concept.references = conceptReferencesUpdated;
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.strictEqual(payload.action, Actions.update);
    assert.deepStrictEqual(payload.idea.references, concept.references);
  };
  storedConcept = await ideaService.update(concept);
  assert.strictEqual(storedConcept.title, conceptTitleUpdated);
  assert.strictEqual(storedConcept.description, conceptDescriptionUpdated);
  assert.strictEqual(storedConcept.done, conceptDoneUpdated);
  assert.deepStrictEqual(storedConcept.references, conceptReferencesUpdated);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // partial update concept without notification
  console.log('Should partial update concept without notification');
  const conceptDonePartialUpdated = true;
  notifiationCalled = 0;
  testNotificationFunction = () => {
  };
  storedConcept = await ideaService.update({ id: storedConcept.id, done: conceptDonePartialUpdated });
  assert.strictEqual(storedConcept.done, conceptDonePartialUpdated);
  assert.strictEqual(notifiationCalled, 0);
  console.log('OK - Passed');

  // partial update concept with notification
  console.log('Should partial update concept with notification');
  const conceptReferencesPartialUpdated = ['http://'];
  notifiationCalled = 0;
  testNotificationFunction = (payload) => {
    assert.deepStrictEqual(payload.action, Actions.update);
    assert.deepStrictEqual(payload.idea.references, conceptReferencesPartialUpdated);
  };
  storedConcept = await ideaService.update({ id: storedConcept.id, references: conceptReferencesPartialUpdated });
  assert.strictEqual(storedConcept.done, conceptDonePartialUpdated);
  assert.strictEqual(notifiationCalled, 1);
  console.log('OK - Passed');

  // test get all by types counts
  console.log('Should return the proper count of entity types');
  let basicIdeas = ideaService.getAllByType<BasicIdea>('BasicIdea');
  assert.strictEqual(basicIdeas.length, 1);

  // store another basic idea
  console.log('Should store another basic idea');
  const basicIdeaTitle2 = 'basic idea title';
  const basicIdeaDescription2 = 'basic idea description';
  const basicIdea2 = new BasicIdea({ title: basicIdeaTitle2, description: basicIdeaDescription2 });
  testNotificationFunction = () => {
  };
  let storedbasicIdea2 = await ideaService.create(basicIdea2);
  assert.strictEqual(storedbasicIdea2.title, basicIdeaTitle2);
  assert.strictEqual(storedbasicIdea2.description, basicIdeaDescription2);
  console.log('OK - Passed');

  // test get all by types counts
  console.log('Should return the proper count of entity types');
  basicIdeas = ideaService.getAllByType<BasicIdea>('BasicIdea');
  assert.strictEqual(basicIdeas.length, 2);

  const toDos = ideaService.getAllByType<ToDo>('ToDo');
  assert.strictEqual(toDos.length, 1);

  const concepts = ideaService.getAllByType<Concept>('Concept');
  assert.strictEqual(concepts.length, 1);

  // update should fail without id
  console.log('Partial update should fail without id');
  try {
    storedbasicIdea = await ideaService.update({ });
  } catch (e) {
    assert.strictEqual(e.message, 'Missing id. Can\'t perform update.');
    console.log('OK - Passed');
  }

  // update should fail when entity is missing
  console.log('Partial update should fail with missing entity');
  try {
    storedbasicIdea = await ideaService.update({ id: 9 });
  } catch (e) {
    assert.strictEqual(e.message, 'Missing entity with id 9');
    console.log('OK - Passed');
  }
})();
