/*
 * Copyright (C) 2022 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {TraceType} from "common/trace/trace_type";
import {UiData} from "./ui_data";

type NotifyViewCallbackType = (uiData: UiData) => void;

class Presenter {
  constructor(notifyViewCallback: NotifyViewCallbackType) {
    this.notifyViewCallback = notifyViewCallback;
    this.uiData = new UiData("Initial UI data");
    this.notifyViewCallback(this.uiData);
  }

  public notifyCurrentTraceEntries(entries: Map<TraceType, any>) {
    this.uiData = new UiData("UI data selected by user on time scrub");
    this.notifyViewCallback(this.uiData);
  }

  public notifyUiEvent() {
    const oldUiDataText = this.uiData ? this.uiData.text : "";
    this.uiData = new UiData(oldUiDataText);
    this.uiData.text += " | UI data updated because of UI event";
    this.notifyViewCallback(this.uiData!);
  }

  readonly notifyViewCallback: NotifyViewCallbackType;
  uiData?: UiData;
}

export {Presenter};
