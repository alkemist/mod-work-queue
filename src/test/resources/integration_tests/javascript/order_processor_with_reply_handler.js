/*
 * Copyright 2011-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

load('vertx.js');
load("vertx_tests.js");

var eb = vertx.eventBus;

var id = vertx.generateUUID();

var handler = function(message, replier) {
    vassert.assertTrue(message.blah != "undefined");
    replier({'message': 'foo'}, function(replyToReply, replyToReplyReplier) {
        replyToReplyReplier({'message': 'bar'});
    });
};

eb.registerHandler(id, handler);

eb.send('test.orderQueue.register', {
    processor: id
});

function vertxStop() {
    eb.send('test.orderQueue.unregister', {
        processor: id
    });
}